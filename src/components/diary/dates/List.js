'use client';

import Card from './Card';
import styles from "./List.module.scss";
import { useState } from 'react';

function getWeekDays(day) {
    let currentDay = new Date(day);
    let week = [];
    currentDay.setDate((currentDay.getDate() - currentDay.getDay() + 1));
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(currentDay)  
        ); 
        currentDay.setDate(currentDay.getDate() + 1);
    }
    return week; 
}

export default function List({ day }) {
    const [activeDate, setActiveDate] = useState(day.getDay());
    let currentDates = getWeekDays(day);
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

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