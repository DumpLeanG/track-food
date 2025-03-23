'use client';

import List from './List';
import styles from "./Dates.module.scss";
import Arrow from '../../layout/buttons/Arrow';
import { useContext } from 'react';
import { DayContext } from '@/lib/DayContext';

export default function Dates() {
    const {day, setDay} = useContext(DayContext);
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