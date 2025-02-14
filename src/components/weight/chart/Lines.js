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
    defaults,
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

export default function Lines( {weights} ) {
    const labels = weights.map(item => item.date);
    const numbers = weights.map(item => item.weight);

    const options = {
        plugins: {
            legend: {
            display: false
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                display: false,
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
            data: numbers,
            borderColor: '#E3AA40',
            backgroundColor: '#E3AA40',
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

    return (
        <div className={styles.weight_chart_lines}>
            <Dash dash={dashes.top} value="94.6"/>
            <Line data={data} options={options} />
            <Dash dash={dashes.bottom} value="70.0"/>
        </div>
    );
}