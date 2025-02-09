import Layout from "../layout/Layout";
import styles from "./Weight.module.scss";
import Inputs from "./inputs/Inputs";
import Chart from "./chart/Chart";

export default function Weight() {
    return (
        <section className={styles.weight}>
            <Layout>
                <Inputs />
                <Chart />
            </Layout>
        </section>
    );
}