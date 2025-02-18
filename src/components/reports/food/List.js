import styles from "./List.module.scss";
import Item from "./Item";

const foodList = [
    {
        name: "Оладьи",
        amount: 3,
        calories: 427,
    },
    {
        name: "Рис вареный",
        amount: 3,
        calories: 427,
    },

]

export default function List() {
    return (
        <ul className={styles.reports_food_list}>
            <li className={styles.reports_food_list_item}>
                <span>Продукты</span>
                <div>
                    <span>Кол-во приемов</span>
                    <span>Ккал</span>
                </div>
            </li>
            {foodList.map((item) => (
                <Item key={item.name} className={styles.reports_food_list_item} name={item.name} amount={item.amount} calories={item.calories}/>
            ))}
        </ul>
    );
}