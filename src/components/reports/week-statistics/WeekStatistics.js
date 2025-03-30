import Calories from "./Calories";
import styles from "./WeekStatistics.module.scss";
import BarChart from "./BarChart";
import Meals from "./Meals";

export default function WeekStatistics({currentDates}) {
    return (
        <div className={styles.reports_statistics}>
            <Calories currentDates={currentDates}/>
            <BarChart currentDates={currentDates}/>
            <Meals currentDates={currentDates}/>
        </div>
    );
}