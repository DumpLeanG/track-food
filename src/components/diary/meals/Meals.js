import styles from "./Meals.module.scss";
import DayResult from "./DayResult";
import Meal from "./Meal";

export default function Meals() {
    return (
        <div className={styles.diary_meals}>
            <DayResult />
            <Meal type="breakfast"/>
            <Meal type="lunch"/>
            <Meal type="dinner"/>
            <Meal type="snack"/>
        </div>
    );
}