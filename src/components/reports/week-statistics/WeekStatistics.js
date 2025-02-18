import Calories from "./Calories";
import styles from "./WeekStatistics.module.scss";
import BarChart from "./BarChart";
import Meals from "./Meals";

export default function WeekStatistics({currentDates}) {
    return (
        <div className={styles.reports_statistics}>
            <Calories />
            <BarChart currentDates={currentDates}/>
            <Meals />
        </div>
    );
}