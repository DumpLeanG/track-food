import styles from "./Item.module.scss";

export default function Item( {title, text} ) {
    return (
        <li className={styles.notifications_list_item}>
            <span className={styles.notifications_list_item_title}>{title}</span>
            <p className={styles.notifications_list_item_txt}>{text}</p>
        </li>
    )
}