'use client'

import styles from "./Lines.module.scss";
import Dash from "./Dash";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const weights = [
    {
        weight: 71.4,
        date: "29.12",
    },
    {
        weight: 72.3,
        date: "30.12",
    },
    {
        weight: 70.4,
        date: "31.12",
    },
    {
        weight: 70.4,
        date: "1.01",
    },
    {
        weight: 70.4,
        date: "2.01",
    },
    {
        weight: 70.4,
        date: "3.01",
    }
]

const labels = weights.map(item => item.date);
const numbers = weights.map(item => item.weight);

export const options = {
    plugins: {
        legend: {
           display: false
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            grid: {
                color: 'transparent',
            },
            suggestedMin: 50,
            suggestedMax: 100,
            ticks: {
                color: 'transparent',
            }
        },
        x: {
            grid: {
                color: 'transparent',
            },
            ticks: {
                color: 'transparent',
            }
        }
    }
}
  
export const data = {
    labels,
    datasets: [
      {
        label: '',
        data: numbers,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
};

const dashes = {
    top: {
        dashClass: styles.top_dash,
        labelClass: styles.top_label
    },
    bottom: {
        dashClass: styles.bottom_dash,
        labelClass: styles.bottom_label
    }
}

export default function Lines() {
    return (
        <div className={styles.weight_chart_lines}>
            <Dash dash={dashes.top}/>
            <Line data={data} options={options}/>
            <Dash dash={dashes.bottom}/>
        </div>
    );
}