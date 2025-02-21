import styles from "./Year.module.scss";

export default function Year({year}) {
    return (
        <span className={styles.weight_changes_year}>{year}</span>
    );
}