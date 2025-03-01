'use client';

import List from './List';
import styles from "./Dates.module.scss";
import Arrow from '../../buttons/Arrow';
import { useContext } from 'react';
import { dayContext, setDayContext } from '@/lib/dayContext';

export default function Dates() {
    const day = useContext(dayContext);
    const setDay = useContext(setDayContext);
    function handleLeftClick() {
        setDay(new Date(day.setDate(day.getDate() - 7)));
    }
    
    function handleRightClick() {
        setDay(new Date(day.setDate(day.getDate() + 7)));
    }

    return (
        <div className={styles.diary_dates}>
            <Arrow direction="left" className={styles.diary_dates_arrow} handleClick={handleLeftClick}/>
            <List day={day} setDay={setDay}/>
            <Arrow direction="right" className={styles.diary_dates_arrow} handleClick={handleRightClick}/>
        </div>
    );
}