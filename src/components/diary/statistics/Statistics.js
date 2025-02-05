import styles from "./Statistics.module.scss";
import Summary from "./Summary";
import Diagram from "./Diagram";
export default function Statistics() {
    return (
        <div className={styles.diary_statistics}>
            <Summary />
            <Diagram />
        </div>
    );
}