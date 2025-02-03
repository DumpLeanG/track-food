import styles from "./Product.module.scss";

export default function Product( {isActive} ) {

    return (
        <li className={styles.diary_meals_item_products_item}>
            <div className={styles.diary_meals_item_products_item_info}>
                <span className={styles.diary_meals_item_products_item_info_name}>Индилайт Кампана Ветчина из Грудки Индейки</span>
                <span className={styles.diary_meals_item_products_item_info_weight}>15 г</span>
            </div>
            <div className={styles.diary_meals_item_products_item_info}>
                <div className={styles.diary_meals_item_products_item_info_pfc}>
                    <span>1.8</span>
                    <span>0.3</span>
                    <span>0.6</span>
                </div>
                <span className={styles.diary_meals_item_products_item_info_calories}>12</span>
            </div>
        </li>
    );
}