import styles from "./Result.module.scss";

export default function Result() {
    return (
        <div className={styles.weight_chart_result}>
            <span>Сброшено: 23,2 кг</span>
            <span>Осталось: 1,4 кг</span>
        </div>
    );
}