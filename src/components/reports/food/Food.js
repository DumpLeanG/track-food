import styles from "./Food.module.scss";
import List from "./List";
import Button from "@/components/layout/buttons/Button";

export default function Food() {
    return (
        <div className={styles.reports_food}>
            <span className={styles.reports_food_title}>Съеденная пища</span>
            <List />
            <Button type="more"/>
        </div>
    );
}