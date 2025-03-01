'use client';

import Card from './Card';
import styles from "./List.module.scss";
import { useState } from 'react';
import { getWeekDays, weekDays} from '@/lib/getWeekDays';

export default function List({ day, setDay }) {
    let currentDates = getWeekDays(day);

    return (
        <ul className={styles.diary_dates_list}>
            {
                currentDates.map((currentDate) => (
                    <Card key={currentDate} 
                    handleClick={() => setDay(currentDate)}
                    date={weekDays[currentDate.getDay()] + " / " + currentDate.getDate() + "." + (currentDate.getMonth() + 1)} 
                    calories="1459 ккал" 
                    isActive={currentDate.getDay() === day.getDay()}/>
                ))
            }
        </ul>
    );
}