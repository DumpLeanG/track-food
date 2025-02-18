import styles from "./Meals.module.scss";

export default function Meals() {
    return (
        <div className={styles.reports_statistics_meals}>
            <div className={styles.reports_statistics_meals_head}>
                <span>Приемы пищи</span>
                <span>Ккал</span>
            </div>
            <ul className={styles.reports_statistics_meals_list}>
                <li className={styles.reports_statistics_meals_list_item}>
                    <div className={styles.reports_statistics_meals_list_item_name}>
                        <span></span>
                        Завтрак
                    </div>
                    <div className={styles.reports_statistics_meals_list_item_calories}>
                        <span>(31%)</span>
                        <span className="green_numbers">3166</span>
                    </div>
                </li>
                <li className={styles.reports_statistics_meals_list_item}>
                    <div className={styles.reports_statistics_meals_list_item_name}>
                        <span></span>
                        Обед
                    </div>
                    <div className={styles.reports_statistics_meals_list_item_calories}>
                        <span>(30%)</span>
                        <span className="green_numbers">3063</span>
                    </div>
                </li>
                <li className={styles.reports_statistics_meals_list_item}>
                    <div className={styles.reports_statistics_meals_list_item_name}>
                        <span></span>
                        Ужин
                    </div>
                    <div className={styles.reports_statistics_meals_list_item_calories}>
                        <span>(21%)</span>
                        <span className="green_numbers">2144</span>
                    </div>
                </li>
                <li className={styles.reports_statistics_meals_list_item}>
                    <div className={styles.reports_statistics_meals_list_item_name}>
                        <span></span>
                        Перекус
                    </div>
                    <div className={styles.reports_statistics_meals_list_item_calories}>
                        <span>(18%)</span>
                        <span className="green_numbers">1840</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}