'use client'

import styles from "./Lines.module.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    defaults,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { UserContext } from "@/lib/UserContext";
import { useContext } from "react";
import { WeightsContext } from "@/lib/WeightsContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

export default function Lines() {
    const { user } = useContext(UserContext);
    const { weights } = useContext(WeightsContext);
    const labels = weights.map(item => new Date(item.recorded_at).toLocaleString("ru", dateOptions));
    const numbers = weights.map(item => item.weight);
    const initialWeightValue = user?.user_metadata.initial_weight;
    const targetWeightValue = user?.user_metadata.target_weight;
    const initialNumbers = weights.map(() => initialWeightValue);
    const targetNumbers = weights.map(() => targetWeightValue);
    const maxWeightValue = Math.max(...numbers);
    const minWeightValue = Math.min(...numbers, targetWeightValue);


    const options = {
        interaction: {
            intersect: false,
            mode: 'nearest'
        },
        plugins: {
            legend: {
            display: false
            },
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                display: false,
                beginbeginAtZero: true,
                max: Math.round(maxWeightValue + 2),
                min: Math.round(minWeightValue - 2),
            },
            x: {
                display: false,
            }
        }
    }
  
    const data = {
        labels,
        datasets: [
        {
            label: '',
            data: initialNumbers,
            borderColor: styles.red,
            backgroundColor: styles.red,
            borderDash: [5, 5],
            pointRadius: numbers.map((number, index) => index === 0 ? 1 : 0),
            pointHoverRadius: numbers.map((number, index) => index === 0 ? 1 : 0)
        },
        {
            label: '',
            data: numbers,
            borderColor: styles.yellow,
            backgroundColor: styles.yellow,
            pointRadius: 3,
            pointHoverRadius: 3
        },
        {
            label: '',
            data: targetNumbers,
            borderColor: styles.green,
            backgroundColor: styles.green,
            borderDash: [5, 5],
            pointRadius: numbers.map((number, index) => index === numbers.length-1 ? 1 : 0),
            pointHoverRadius: numbers.map((number, index) => index === numbers.length-1 ? 1 : 0)
        },
        ],
    };

    return (
        <div className={styles.weight_chart_lines}>
            <Line data={data} options={options} />
        </div>
    );
}