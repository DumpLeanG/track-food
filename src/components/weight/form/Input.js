'use client';

import styles from "./Input.module.scss";
import NumberInput from "@/components/layout/inputs/NumberInput";

export default function Input( {label, defaultValue} ) {

    return (
        <div className={styles.weight_form_inputs_item}>
            <label>
                {label}
            </label>
            <NumberInput defaultValue={defaultValue} measurement="кг" step="0.1" max="300"/>
        </div>
    );
}