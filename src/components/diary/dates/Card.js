import styles from "./Card.module.scss";

export default function Card({ date, calories, isActive, handleClick }) {
    return (
        isActive ? (
        <li className={`${styles.diary_dates_list_item} ${styles.selected_date}`}>
            <span className={styles.diary_dates_list_item_date}>{date}</span>
            <span className={styles.diary_dates_list_item_calories}>{calories}</span>
        </li>
    ) : <li className={`${styles.diary_dates_list_item}`} onClick={handleClick}>
        <span className={styles.diary_dates_list_item_date}>{date}</span>
        <span className={styles.diary_dates_list_item_calories}>{calories}</span>
    </li>
    );
}