import Layout from "../layout/Layout";
import styles from "./Weight.module.scss";
import Form from "./form/Form";
import Chart from "./chart/Chart";
import Changes from "./changes/Changes";

const weights = [
    {
        weight: 94.6,
        date: "06.10.2023",
    },
    {
        weight: 94.2,
        date: "07.10.2023",
    },
    {
        weight: 93.2,
        date: "08.10.2023",
    },
    {
        weight: 93.7,
        date: "09.10.2023",
    },
    {
        weight: 92.7,
        date: "10.10.2023",
    },
    {
        weight: 92.9,
        date: "11.10.2023",
    },
    {
        weight: 92.7,
        date: "13.10.2023",
    },
    {
        weight: 93.1,
        date: "14.10.2023",
    },
    {
        weight: 92.4,
        date: "15.10.2023",
    },
    {
        weight: 92.1,
        date: "16.10.2023",
    },
    {
        weight: 92,
        date: "18.10.2023",
    },
    {
        weight: 91.9,
        date: "20.10.2023",
    },
    {
        weight: 71.4,
        date: "29.12.2024",
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