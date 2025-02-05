"use client"

import styles from "./Diagram.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    datasets: [
      {
        label: '% Калорий',
        data: [28, 34.5, 37.5],
        backgroundColor: [
          'rgba(43, 122, 195, 1)',
          'rgba(209, 52, 139, 1)',
          'rgba(227, 170, 64, 1)',
        ],
        borderWidth: 0,
      },
    ],
  };

export default function Diagram() {
    return (
        <div className={styles.diary_statistics_diagram}>
            <div>
                <Doughnut data={data} height="192px"
                width="192px"
                options={{ maintainAspectRatio: false }}/>
            </div>
            <ul className={styles.diary_statistics_diagram_labels}>
                <li><span />Белки: 28%</li>
                <li><span />Жиры: 34.5%</li>
                <li><span />Углеводы: 37.5%</li>
            </ul>
        </div>
    );
}