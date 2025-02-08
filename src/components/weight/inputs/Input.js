'use client';

import styles from "./Input.module.scss";
import { useState } from "react";

export default function Input( {label, defaultValue} ) {
    const inputTypes = ["text", "number"];
    const [inputType, setInputType] = useState(inputTypes[0]);
    const [inputValue, setInputValue] = useState(defaultValue);

    return (
        <div className={styles.weight_inputs_item}>
            <label>
                {label}
            </label>
            <div>
                <input type={inputType}
                placeholder="0.0 кг"
                step="0.1"
                min="0"
                max="300"
                value={(inputType === inputTypes[0]? `${inputValue} кг` : inputValue)}
                onFocus={() => setInputType(inputTypes[1])}
                onBlur={() => setInputType(inputTypes[0])}
                onChange={e => setInputValue(e.target.value)} />
            </div>
        </div>
    );
}