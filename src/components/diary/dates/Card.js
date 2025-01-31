import styles from "./Card.module.scss";

export default function Card({ date, callories, isActive, handleClick }) {
    return (
        isActive ? (
        <li className={`${styles.diary_dates_list_item} ${styles.selected_date}`}>
            <span className={styles.diary_dates_list_item_date}>{date}</span>
            <span className={styles.diary_dates_list_item_callories}>{callories}</span>
        </li>
    ) : <li className={`${styles.diary_dates_list_item}`} onClick={handleClick}>
        <span className={styles.diary_dates_list_item_date}>{date}</span>
        <span className={styles.diary_dates_list_item_callories}>{callories}</span>
    </li>
    );
}