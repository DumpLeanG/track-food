import styles from "./Chart.module.scss";
import Result from "./Result";
import Lines from "./Lines";

export default function Chart( {weights} ) {
    return (
        <div className={styles.weight_chart}>
            <Result />
            <Lines weights={weights}/>
        </div>
    );
}