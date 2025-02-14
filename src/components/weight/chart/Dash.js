import styles from "./Dash.module.scss";


export default function Dash( {dash, value} ) {
    return (
        <div className={styles.weight_chart_lines_dash}>
            <span className={dash.dashClass}></span>
            <span className={`${dash.labelClass} ${styles.weight_chart_lines_dash_value}`}>{value}</span>
        </div>
    );
}