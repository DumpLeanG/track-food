"use client";

import styles from "./Changes.module.scss";
import Year from "./Year";
import Button from "@/components/layout/buttons/Button";
import List from "./List";
import { useContext, useState } from "react";
import { WeightsContext } from "@/lib/WeightsContext";

export default function Changes() {
    const { weights } = useContext(WeightsContext) 
    const reversedWeights = [...weights].reverse();
    const [showedWeights, setShowedWeights] = useState(8);

    function handleClick() {
        if (showedWeights >= reversedWeights.length) return;
        setShowedWeights(prevCount => prevCount + 8);
    }

    return (
        <div className={styles.weight_changes}>
            <List weights={reversedWeights.slice(0, showedWeights)}/>
            <Button type="more" onClick={handleClick}/>
        </div>
    );
}