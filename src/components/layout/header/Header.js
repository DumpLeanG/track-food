import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import Layout from "../Layout";
export default function Header() {
    return (
        <header className={styles.header}>
            <Layout>
                <nav className={styles.header_nav}>
                    <Link href="#">
                        <Image
                        className={styles.header_nav_logo}
                        src="/logo.svg"
                        alt="logo"
                        width={128}
                        height={28}
                        priority
                        />
                    </Link>
                    <ul className={styles.header_nav_list}>
                        <li><Link href="#">Дневник</Link></li>
                        <li><Link href="#">Мой вес</Link></li>
                        <li><Link href="#">Отчеты</Link></li>
                    </ul>
                    <ul className={styles.header_nav_list}>
                        <li>
                            <Link href="#">
                                <Image
                                src="/notification.svg"
                                alt="logo"
                                width={25}
                                height={25}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <Image
                                src="/calendar.svg"
                                alt="logo"
                                width={25}
                                height={25}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link href="#">
                                <Image
                                src="/user.svg"
                                alt="logo"
                                width={25}
                                height={25}
                                />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </Layout>
        </header>
    )
}