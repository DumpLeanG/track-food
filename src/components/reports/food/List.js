import styles from "./List.module.scss";
import Item from "./Item";
import { useContext } from "react";
import { EatenFoodContext } from "@/lib/EatenFoodContext";

export default function List( {currentDates, food} ) {
    const { isLoading } = useContext(EatenFoodContext);
    
    return (
        <ul className={styles.reports_food_list}>
            <li className={styles.reports_food_list_item}>
                <span>Продукты</span>
                <div>
                    <span>Кол-во приемов</span>
                    <span>Ккал</span>
                </div>
            </li>
            {!isLoading ? food.map((item) => (
                <Item key={item.food_id} className={styles.reports_food_list_item} name={item.name} amount={item.count} calories={item.calories}/>
            )) : <div className={styles.reports_food_list_load}></div>}
        </ul>
    );
}