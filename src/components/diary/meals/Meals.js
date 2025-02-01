import styles from "./Meals.module.scss";
import DayResult from "./DayResult";

export default function Meals() {
    return (
        <div className={styles.diary_meals}>
            <DayResult />
        </div>
    );
}