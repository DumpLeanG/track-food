'use client';

import Card from './Card';
import styles from "./List.module.scss";
import { useState } from 'react';

function dates(current) {
    let week = [];
    current.setDate((current.getDate() - current.getDay() +1));
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(current)  
        ); 
        current.setDate(current.getDate() +1);
    }
    return week; 
}

export default function List() {
    const [activeDate, setActiveDate] = useState(new Date());
    let currentDates = dates(new Date());
    const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

    return (
        <ul className={styles.diary_dates_list}>
            {
                currentDates.map((currentDate) => (
                    <Card key={currentDate} date={weekDays[currentDate.getDay()] + " / " + currentDate.getDate() + "." + (currentDate.getMonth() + 1)} callories="1459 ккал" isActive={currentDate.toDateString() === activeDate.toDateString()}/>
                ))
            }
        </ul>
    );
}