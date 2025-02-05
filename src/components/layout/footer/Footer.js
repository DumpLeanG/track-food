import styles from "./Footer.module.scss";
import Layout from "../Layout";
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Layout>
                <span>2024 Track Food. Created by Michail Chinenov</span>
            </Layout>
        </footer>
    )
}