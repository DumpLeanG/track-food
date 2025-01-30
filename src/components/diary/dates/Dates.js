import List from './List';
import styles from "./Dates.module.scss";

export default function Dates() {
    return (
        <div className={styles.diary_dates}>
            <List />
        </div>
    );
}