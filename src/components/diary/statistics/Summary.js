import styles from "./Summary.module.scss";

export default function Summary() {
    return (
        <div className={styles.diary_statistics_summary}>
            <div className={styles.diary_statistics_summary_line}>
                <div className={styles.diary_statistics_summary_line_fill} style={{width: "535px"}}>
                    <span>97% от РСК</span>
                </div>
            </div>
            <h2>Сводка</h2>
            <div className={styles.diary_statistics_summary_text}>
                <p>Употреблено калорий <span>1459</span></p>
            </div>
            <div className={styles.diary_statistics_summary_text}>
                <p>Осталось калорий <span>41</span></p>
            </div>
            <hr />
            <div className={styles.diary_statistics_summary_text}>
                <p>РСК <span>1500</span></p>
            </div>
        </div>
    );
}