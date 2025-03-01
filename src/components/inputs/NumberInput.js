'use client';

import { useState } from "react";

export default function NumberInput( {defaultValue, measurement, step, max} ) {
    const inputTypes = ["text", "number"];
    const [inputType, setInputType] = useState(inputTypes[0]);
    const [inputValue, setInputValue] = useState(defaultValue);

    return (
        <input type={inputType}
            placeholder={`0.0 ${measurement}`}
            step={step}
            min="0"
            max={max}
            value={(inputType === inputTypes[0]? `${inputValue} ${measurement}` : inputValue)}
            onFocus={() => setInputType(inputTypes[1])}
            onBlur={() => setInputType(inputTypes[0])}
            onChange={e => setInputValue(e.target.value)} />
    )
}