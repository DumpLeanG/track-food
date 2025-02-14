import styles from "./Inputs.module.scss";
import Input from "./Input";

const inputs = [
    {
        label: "Начальный вес",
        defaultValue: "94.6"
    },

    {
        label: "Текущий вес",
        defaultValue: "71.4"
    },

    {
        label: "Желаемый вес",
        defaultValue: "70.0"
    },
]


export default function Inputs() {
    return (
        <div className={styles.weight_form_inputs}>
            {inputs.map(input => {
                return <Input key={input.label} {...input}/>;
            })}
        </div>
    );
}