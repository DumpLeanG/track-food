import styles from "./List.module.scss";
import Item from "./Item";
import Year from "./Year";
import React from "react";

export default function List( {weights} ) {
    return (
        <>
            <ul className={styles.weight_changes_list}>
                <Year key={weights[0].date.getFullYear()} year={weights[0].date.getFullYear()}/>
                {weights.map((element, index) => {
                    const prevElement = weights[index + 1];
                    const nextElement = weights[index - 1];
                    if (index !== weights.length - 1) {
                        if(index > 0 && element.date.getFullYear() !== nextElement.date.getFullYear()) {
                            return (
                                <React.Fragment key={element.date.getFullYear()}>
                                    <Year key={element.date.getFullYear()} year={element.date.getFullYear()}/>
                                    <Item key={element.date} date={element.date} weight={element.weight} image={(element.weight <= prevElement.weight)? "weight-loss" : "weight-gain"}/>
                                </React.Fragment>
                            )
                        }
                        return <Item key={element.date} date={element.date} weight={element.weight} image={(element.weight <= prevElement.weight)? "weight-loss" : "weight-gain"}/>
                    }
                    return <Item key={element.date} date={element.date} weight={element.weight} image="weight-loss"/>;
                })}
            </ul>
        </>
    );
}