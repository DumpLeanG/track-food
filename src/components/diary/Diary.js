import Layout from "../layout/Layout";
import Dates from "./dates/Dates";
import Meals from "./meals/Meals";
import styles from "./Diary.module.scss";
import Statistics from "./statistics/Statistics";


export default function Diary() {
    return (
        <section className={styles.diary}>
            <Layout>
                <Dates />
                <Meals />
                <Statistics />
            </Layout>
        </section>
    );
}