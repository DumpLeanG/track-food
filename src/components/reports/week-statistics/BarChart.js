"use client"

import styles from "./BarChart.module.scss";
import React, {useContext} from 'react';
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
import { UserContext } from "@/lib/UserContext";
import { EatenFoodContext } from "@/lib/EatenFoodContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({currentDates}) {
  const { user } = useContext(UserContext);
  const { eatenFood } = useContext(EatenFoodContext);
  const filteredFood = eatenFood.filter((food) => 
    food.date >= `${currentDates[0].getFullYear()}-${currentDates[0].getMonth() + 1 < 10 ? '0' : ''}${currentDates[0].getMonth() + 1}-${currentDates[0].getDate() < 10 ? '0' : ''}${currentDates[0].getDate()}` && 
    food.date <= `${currentDates[currentDates.length - 1].getFullYear()}-${currentDates[currentDates.length - 1].getMonth() + 1 < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getMonth() + 1}-${currentDates[currentDates.length - 1].getDate() < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getDate()}`
  );

  const dailyMealsData = currentDates.map(date => {
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    
    return {
      date: dateStr,
      breakfast: 0,
      lunch: 0,
      dinner: 0,
      snack: 0
    };
  });

  filteredFood.forEach(food => {
    const dayData = dailyMealsData.find(day => day.date === food.date);
    if (dayData) {
      switch(food.meal_id) {
        case 1: dayData.breakfast += food.calories; break;
        case 2: dayData.lunch += food.calories; break;
        case 3: dayData.dinner += food.calories; break;
        case 4: dayData.snack += food.calories; break;
      }
    }
  });

  const options = {
    categoryPercentage: 1.0,
    barPercentage: 1.0,
    maxBarThickness: 165,
    layout: {},
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
        max: user?.user_metadata?.rda,
      },
      x: {
        stacked: true,
        display: false,
      }
    }
  };

  const labels = currentDates.map(date => 
    `${weekDays[date.getDay()]} / ${date.getDate()}.${date.getMonth() + 1}`
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Завтрак',
        data: dailyMealsData.map(day => day.breakfast),
        backgroundColor: '#E3AA40',
      },
      {
        label: 'Обед',
        data: dailyMealsData.map(day => day.lunch),
        backgroundColor: '#3F972E',
      },
      {
        label: 'Ужин',
        data: dailyMealsData.map(day => day.dinner),
        backgroundColor: '#2B7AC3',
      },
      {
        label: 'Перекус',
        data: dailyMealsData.map(day => day.snack),
        backgroundColor: '#D1348B',
      },
    ],
  };

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