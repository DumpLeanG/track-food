import styles from "./List.module.scss";
import Item from "./Item";
import Year from "./Year";
import React, { useContext } from "react";
import { WeightsContext } from "@/lib/WeightsContext";

export default function List( {weights} ) {
    const { isLoading } = useContext(WeightsContext)
    return (
        <>
            <ul className={styles.weight_changes_list}>
                {!isLoading ? 
                <>
                    <Year key={new Date(weights[0].recorded_at).getFullYear()} year={new Date(weights[0].recorded_at).getFullYear()}/>
                    {weights.map((element, index) => {
                        const prevElement = weights[index + 1];
                        const nextElement = weights[index - 1];
                        const recordToDate = new Date(element.recorded_at);
                        if (index !== weights.length - 1) {
                            if(index > 0 && recordToDate.getFullYear() !== new Date(nextElement.recorded_at).getFullYear()) {
                                return (
                                    <React.Fragment key={recordToDate.getFullYear()}>
                                        <Year key={recordToDate.getFullYear()} year={recordToDate.getFullYear()}/>
                                        <Item key={recordToDate} date={recordToDate} weight={element.weight} image={(element.weight <= prevElement.weight)? "weight-loss" : "weight-gain"}/>
                                    </React.Fragment>
                                )
                            }
                            return <Item key={recordToDate} date={recordToDate} weight={element.weight} image={(element.weight <= prevElement.weight)? "weight-loss" : "weight-gain"}/>
                        }
                        return <Item key={recordToDate} date={recordToDate} weight={element.weight} image="weight-loss"/>;
                    })}
                </>
                : <div className={styles.weight_changes_list_load}></div>}
                
            </ul>
        </>
    );
}