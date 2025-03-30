import styles from "./Item.module.scss";

const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

export default function Item( {title, text, date} ) {
    return (
        <li className={styles.notifications_list_item}>
            <span className={styles.notifications_list_item_title}>{title}</span>
            <p className={styles.notifications_list_item_txt}>{text}</p>
            <span className={styles.notifications_list_item_date}>{new Date(date).toLocaleString("ru", options)}</span>
        </li>
    )
}