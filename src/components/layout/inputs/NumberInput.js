'use client';

import { useState } from "react";

export default function NumberInput( {defaultValue, onChange, hasOwnOnChange, placeholder, measurement, step, max, name} ) {
    const inputTypes = ["text", "number"];
    const [inputType, setInputType] = useState(inputTypes[0]);
    const [inputValue, setInputValue] = useState(defaultValue);

    return (
        <input type={inputType}
            placeholder={placeholder}
            step={step}
            min="0"
            max={max}
            value={(inputType === "text"? (hasOwnOnChange ? `${defaultValue} ${measurement}` : `${inputValue} ${measurement}`)  : (hasOwnOnChange ? defaultValue : inputValue))}
            onFocus={() => setInputType(inputTypes[1])}
            onBlur={() => setInputType(inputTypes[0])}
            onChange={hasOwnOnChange ? onChange :e => setInputValue(e.target.value)}
            name={name} />
    )
}