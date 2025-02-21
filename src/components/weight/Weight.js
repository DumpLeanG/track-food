import Layout from "../layout/Layout";
import styles from "./Weight.module.scss";
import Form from "./form/Form";
import Chart from "./chart/Chart";
import Changes from "./changes/Changes";

const weights = [
    {
        weight: 94.6,
        date: new Date('10.06.2023'),
    },
    {
        weight: 94.2,
        date: new Date('10.07.2023'),
    },
    {
        weight: 93.2,
        date: new Date('10.08.2023'),
    },
    {
        weight: 93.7,
        date: new Date('10.09.2023'),
    },
    {
        weight: 92.7,
        date: new Date('10.10.2023'),
    },
    {
        weight: 92.9,
        date: new Date('10.11.2023'),
    },
    {
        weight: 92.7,
        date: new Date('10.13.2023'),
    },
    {
        weight: 93.1,
        date: new Date('10.14.2023'),
    },
    {
        weight: 92.4,
        date: new Date('10.15.2023'),
    },
    {
        weight: 92.1,
        date: new Date('10.16.2023'),
    },
    {
        weight: 92,
        date: new Date('10.18.2023'),
    },
    {
        weight: 91.9,
        date: new Date('10.20.2023'),
    },
    {
        weight: 71.4,
        date: new Date('12.29.2024'),
    },
]

export default function Weight() {
    return (
        <section className={styles.weight}>
            <Layout>
                <Form />
                <Chart weights={weights}/>
                <Changes weights={weights}/>
            </Layout>
        </section>
    );
}