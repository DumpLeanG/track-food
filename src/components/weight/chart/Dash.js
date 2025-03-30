import styles from "./Dash.module.scss";


export default function Dash( {dash, value, style} ) {
    return (
        <span style={style} className={`${dash.labelClass} ${styles.weight_chart_lines_sign}`}>{value}</span>
    );
}