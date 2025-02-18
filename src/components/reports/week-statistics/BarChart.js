"use client"

import styles from "./BarChart.module.scss";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {weekDays} from '@/lib/getWeekDays';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    categoryPercentage: 1.0,
    barPercentage: 1.0,
    maxBarThickness: 165,
    layout: {
    },
    plugins: {
        legend: {
        display: false
        },
    },
    borderRadius: 5,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            stacked: true,
            display: false,
            max: 1500,
        },
        x: {
            stacked: true,
            display: false,
        }
    }
};

const labels = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Завтрак',
      data: [452, 452, 452, 452, 452, 452, 452],
      backgroundColor: '#E3AA40',
    },
    {
      label: 'Обед',
      data: [437, 437, 437, 437, 437, 437, 437],
      backgroundColor: '#3F972E',
    },
    {
      label: 'Ужин',
      data: [306, 306, 306, 306, 306, 306, 306],
      backgroundColor: '#2B7AC3',
    },
    {
        label: 'Перекус',
        data: [262, 262, 262, 262, 262, 262, 262],
        backgroundColor: '#D1348B',
    },
  ],
};

export default function BarChart({currentDates}) {

    return (
        <div className={styles.reports_statistics_chart}>
            <span></span>
            <div>
                <Bar options={options} data={data}/>
            </div>
            <ul className={styles.reports_statistics_chart_days}>
                {currentDates.map((currentDate) => (
                    <li key={currentDate.getDay()}>
                      <span>{weekDays[currentDate.getDay()] + " / " + currentDate.getDate() + "." + (currentDate.getMonth() + 1)}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}