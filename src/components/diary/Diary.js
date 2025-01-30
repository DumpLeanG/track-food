import Layout from "../layout/Layout";
import Dates from "./dates/Dates";
import styles from "./Diary.module.scss";


export default function Diary() {
    return (
        <section className={styles.diary}>
            <Layout>
                <Dates />
            </Layout>
        </section>
    );
}