import styles from "./Card.module.scss";

export default function Card({ date, callories, isActive}) {
    return (
        isActive ? (
        <li className={`${styles.diary_dates_list_item} ${styles.selected_date}`}>
            <span className={styles.diary_dates_list_item_date}>{date}</span>
            <span className={styles.diary_dates_list_item_callories}>{callories}</span>
        </li>
    ) : <li className={`${styles.diary_dates_list_item}`}>
        <span className={styles.diary_dates_list_item_date}>{date}</span>
        <span className={styles.diary_dates_list_item_callories}>{callories}</span>
    </li>
    );
}