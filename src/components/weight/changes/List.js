import styles from "./List.module.scss";
import Item from "./Item";

export default function List( {weights} ) {
    return (
        <ul className={styles.weight_changes_list}>
            {weights.map((element, index) => {
                if (index === weights.length - 1) {
                    return <Item key={element.date} date={element.date} weight={element.weight} image="weight-loss"/>;
                }
                
                const prevElement = weights[index + 1];
                return <Item key={element.date} date={element.date} weight={element.weight} image={(element.weight <= prevElement.weight)? "weight-loss" : "weight-gain"}/>
            })}
        </ul>
    );
}