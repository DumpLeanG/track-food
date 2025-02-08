import Layout from "../layout/Layout";
import styles from "./Weight.module.scss";
import Inputs from "./inputs/Inputs";

export default function Weight() {
    return (
        <section className={styles.weight}>
            <Layout>
                <Inputs />
            </Layout>
        </section>
    );
}