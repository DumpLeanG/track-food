"use client"

import styles from "./BarChart.module.scss";
import React, {useContext} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {weekDays} from '@/lib/getWeekDays';
import { UserContext } from "@/lib/UserContext";
import { EatenFoodContext } from "@/lib/EatenFoodContext";
import { IsDeviceContext } from "@/lib/IsDeviceContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({currentDates}) {
  const { user } = useContext(UserContext);
  const { eatenFood } = useContext(EatenFoodContext);
  const { isLaptop } = useContext(IsDeviceContext);
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
      snack: 0,
      total: 0
    };
  });

  filteredFood.forEach(food => {
    const dayData = dailyMealsData.find(day => day.date === food.date);
    if (dayData) {
      const calories = food.calories;
      dayData.total += calories;
      switch(food.meal_id) {
        case 1: dayData.breakfast += calories; break;
        case 2: dayData.lunch += calories; break;
        case 3: dayData.dinner += calories; break;
        case 4: dayData.snack += calories; break;
      }
    }
  });

  const maxCaloriesPerWeek = Math.max(...dailyMealsData.map(day => day.total));
  const userRDA = user?.user_metadata?.rda + 50 || 0;
  const maxYValue = Math.max(maxCaloriesPerWeek, userRDA);

  const labels = currentDates.map(date => 
    `${weekDays[date.getDay()]} / ${date.getDate()}.${date.getMonth() + 1}`
  );

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Завтрак',
        data: dailyMealsData.map(day => day.breakfast),
        backgroundColor: styles.yellow,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        borderRadius: 5,
      },
      {
        type: 'bar',
        label: 'Обед',
        data: dailyMealsData.map(day => day.lunch),
        backgroundColor: styles.dgreen,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        borderRadius: 5,
      },
      {
        type: 'bar',
        label: 'Ужин',
        data: dailyMealsData.map(day => day.dinner),
        backgroundColor: styles.blue,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        borderRadius: 5,
      },
      {
        type: 'bar',
        label: 'Перекус',
        data: dailyMealsData.map(day => day.snack),
        backgroundColor: styles.magenta,
        categoryPercentage: 1.0,
        barPercentage: 1.0,
        borderRadius: 5,
      },
      {
        type: 'line',
        label: 'Всего калорий',
        data: dailyMealsData.map(day => user?.user_metadata?.rda),
        borderColor: styles.red,
        backgroundColor: 'transparent',
        pointRadius: dailyMealsData.map((data, index) => index === 0 ? 1 : 0),
        pointHoverRadius: dailyMealsData.map((data, index) => index === 0 ? 1 : 0),
        borderDash: [5, 5],
        order: 0,
        zIndex: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      y: {
        stacked: true,
        display: false,
        max: maxYValue,
      },
      x: {
        stacked: true,
        display: false,
      }
    }
  };

  return (
    <div className={styles.reports_statistics_chart}>
      <div>
        <Chart type='bar' options={options} data={data}/>
      </div>
      <ul className={styles.reports_statistics_chart_days}>
        {currentDates.map((currentDate) => (
          <li key={currentDate.getDay()}>
            <span>{isLaptop ? currentDate.getDate() + "." + (currentDate.getMonth() + 1) : weekDays[currentDate.getDay()] + " / " + currentDate.getDate() + "." + (currentDate.getMonth() + 1)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}