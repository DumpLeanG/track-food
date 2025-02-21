import Image from "next/image";
import NavLinks from "./NavLinks";
import styles from "./Header.module.scss";
import Layout from "../Layout";
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <Layout>
                <nav className={styles.header_nav}>
                    <Link href="/tracker">
                        <Image
                        className={styles.header_nav_logo}
                        src="/logo.svg"
                        alt="logo"
                        width={128}
                        height={28}
                        priority
                        />
                    </Link>
                    <NavLinks className={styles.header_nav_list} selectedLink={styles.current_link}/>
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
                            <Link href="/">
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