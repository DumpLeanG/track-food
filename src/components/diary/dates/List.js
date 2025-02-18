'use client';

import Card from './Card';
import styles from "./List.module.scss";
import { useState } from 'react';
import { getWeekDays, weekDays} from '@/lib/getWeekDays';

export default function List({ day }) {
    const [activeDate, setActiveDate] = useState(day.getDay());
    let currentDates = getWeekDays(day);

    return (
        <ul className={styles.diary_dates_list}>
            {
                currentDates.map((currentDate) => (
                    <Card key={currentDate.getDay()} 
                    handleClick={() => setActiveDate(currentDate.getDay())}
                    date={weekDays[currentDate.getDay()] + " / " + currentDate.getDate() + "." + (currentDate.getMonth() + 1)} 
                    calories="1459 ккал" 
                    isActive={currentDate.getDay() === activeDate}/>
                ))
            }
        </ul>
    );
}