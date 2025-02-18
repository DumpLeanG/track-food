import styles from "./Calories.module.scss";

export default function Calories() {
    return (
        <div className={styles.reports_statistics_calories}>
            <span>Калории: <span className="green_numbers">10213</span></span>
            <div>
                <span>Среднесуточная норма: <span className="green_numbers">1459</span></span>
                <span>Цель: 1500</span>
            </div>
        </div>
    );
}