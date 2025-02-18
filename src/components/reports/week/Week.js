import styles from "./Week.module.scss";
import Arrow from "@/components/buttons/Arrow";

export default function Week({handleLeftClick, handleRightClick, week}) {
    return (
        <div className={styles.reports_week}>
            <Arrow direction="left" className={styles.reports_week_arrow} handleClick={handleLeftClick}/>
            <span>{week}</span>
            <Arrow direction="right" className={styles.reports_week_arrow} handleClick={handleRightClick}/>
        </div>
    );
}