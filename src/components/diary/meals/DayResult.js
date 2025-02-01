import styles from "./DayResult.module.scss";

export default function DayResult() {

    return (
        <div className={styles.diary_meals_result}>
            <div className={styles.diary_meals_result_names}>
                <span>Белки</span>
                <span>Жиры</span>
                <span>Углеводы</span>
                <span>Калории</span>
            </div>
            <div className={styles.diary_meals_result_numbers}>
                <span>101.79</span>
                <span>55.7</span>
                <span>136.44</span>
                <span>1459</span>
            </div>
        </div>
    );
}