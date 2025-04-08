"use client"

import styles from "./Diagram.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext } from "react";
import { EatenFoodContext } from "@/lib/EatenFoodContext";
import { DayContext } from "@/lib/DayContext";
import { IsDeviceContext } from "@/lib/IsDeviceContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Diagram() {
    const { eatenFood } = useContext(EatenFoodContext);
    const { day } = useContext(DayContext);
    const { isLaptop } = useContext(IsDeviceContext);
    const filteredFood = eatenFood.filter((food) => food.date === `${day.getFullYear()}-${day.getMonth() + 1 < 10 ? '0' : ''}${day.getMonth() + 1}-${day.getDate() < 10 ? '0' : ''}${day.getDate()}`);
    const filteredFoodSum = filteredFood.reduce((sum, food) => sum + food.proteins * 4 + food.fats * 9 + food.carbohydrates * 4, 0)
    const filteredFoodStatistics = {
      proteins: Math.round(filteredFood.reduce((sum, food) => sum + food.proteins * 4, 0) * 100 * 100 / filteredFoodSum) / 100 ,
      fats: Math.round(filteredFood.reduce((sum, food) => sum + food.fats * 9, 0) * 100 * 100 / filteredFoodSum) / 100,
      carbohydrates: Math.round(filteredFood.reduce((sum, food) => sum + food.carbohydrates * 4, 0) * 100 * 100 / filteredFoodSum) / 100,
    }

    const data = {
      datasets: [
        {
          label: '% Калорий',
          data: [filteredFoodStatistics.proteins, filteredFoodStatistics.fats, filteredFoodStatistics.carbohydrates],
          backgroundColor: [
            styles.blue,
            styles.magenta,
            styles.yellow,
          ],
          borderWidth: 0,
        },
      ],
  };

    return (
        <div className={styles.diary_statistics_diagram}>
            <div>
                <Doughnut data={data} height="192px"
                width="192px"
                options={{ maintainAspectRatio: false }}/>
            </div>
            {isLaptop ?
            <ul className={styles.diary_statistics_diagram_labels}>
              <li><span /><span>Бел: {filteredFoodStatistics.proteins || 0}%</span></li>
              <li><span /><span>Жир: {filteredFoodStatistics.fats || 0}%</span></li>
              <li><span /><span>Угл: {filteredFoodStatistics.carbohydrates || 0}%</span></li>
            </ul>
            :
            <ul className={styles.diary_statistics_diagram_labels}>
              <li><span /><span>Белков: {filteredFoodStatistics.proteins || 0}%</span></li>
              <li><span /><span>Жиров: {filteredFoodStatistics.fats || 0}%</span></li>
              <li><span /><span>Углеводов: {filteredFoodStatistics.carbohydrates || 0}%</span></li>
            </ul>}
        </div>
    );
}