'use client';

import List from './List';
import styles from "./Dates.module.scss";
import Arrow from './Arrow';
import { useState } from 'react';

export default function Dates() {
    const [day, setDay] = useState(new Date());
    function handleLeftClick() {
        setDay(new Date(day.setDate(day.getDate() - 7)));
    }
    
    function handleRightClick() {
        setDay(new Date(day.setDate(day.getDate() + 7)));
    }

    return (
        <div className={styles.diary_dates}>
            <Arrow direction="left" handleClick={handleLeftClick}/>
            <List day={day}/>
            <Arrow direction="right" handleClick={handleRightClick}/>
        </div>
    );
}