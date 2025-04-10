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
                    isActive={
                        `${currentDate.getFullYear()}-${currentDate.getMonth() + 1 < 10 ? '0' : ''}${currentDate.getMonth() + 1}-${currentDate.getDate() < 10 ? '0' : ''}${currentDate.getDate()}`
                        === `${day.getFullYear()}-${day.getMonth() + 1 < 10 ? '0' : ''}${day.getMonth() + 1}-${day.getDate() < 10 ? '0' : ''}${day.getDate()}`
                    }
                />
            ))}
        </ul>
    );
}