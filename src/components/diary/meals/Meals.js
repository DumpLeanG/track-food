import styles from "./Meals.module.scss";
import DayResult from "./DayResult";
import Meal from "./Meal";

export default function Meals() {
    return (
        <div className={styles.diary_meals}>
            <DayResult />
            <Meal picture="breakfast" type="Завтрак" isActive={true}/>
        </div>
    );
}