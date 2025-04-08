'use client';

import { useContext, useEffect, useState } from 'react';
import Card from './Card';
import styles from "./List.module.scss";
import { getWeekDays, weekDays } from '@/lib/getWeekDays';
import { IsDeviceContext } from '@/lib/IsDeviceContext';

export default function List({ day, setDay }) {
    const { isLaptop } = useContext(IsDeviceContext);
    const currentDates = getWeekDays(day);
    return (
        <ul className={styles.diary_dates_list}>
            {currentDates.map((currentDate) => (
                <Card 
                    key={currentDate.toString()} 
                    handleClick={() => setDay(currentDate)}
                    date={currentDate}
                    dateText={isLaptop ? `${currentDate.getDate()}.${currentDate.getMonth() + 1}` : `${weekDays[currentDate.getDay()]} / ${currentDate.getDate()}.${currentDate.getMonth() + 1}`}
                    isActive={currentDate.toDateString() === day.toDateString()}
                />
            ))}
        </ul>
    );
}