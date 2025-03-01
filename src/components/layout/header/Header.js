"use client";

import Image from "next/image";
import NavLinks from "./NavLinks";
import styles from "./Header.module.scss";
import Layout from "../Layout";
import Link from "next/link";
import User from "./User";
import Calendar from "./CalendarWindow";
import { useState } from "react";
import { useOutsideClick } from "@/lib/useOutsideClick";


export default function Header( {day, setDay} ) {
    const [shown, setShown] = useState(null);
    const ref = useOutsideClick(() => {
        setShown(null);
    });

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
                        <li className={(shown === "notification")? styles.activated_item : null} ref={(shown === "notification")? ref : null}>
                            <button className={styles.header_nav_list_item_btn} onClick={() => setShown("notification")} >
                                <Image
                                src="/notification.svg"
                                alt="logo"
                                width={25}
                                height={25}
                                />
                            </button>
                            {(shown === "notification")? <User /> : null}
                        </li>
                        <li className={(shown === "calendar")? styles.activated_item : null} ref={(shown === "calendar")? ref : null}>
                            <button className={styles.header_nav_list_item_btn} onClick={() => setShown("calendar")} >
                                <Image
                                src="/calendar.svg"
                                alt="logo"
                                width={25}
                                height={25}
                                />
                            </button>
                            {(shown === "calendar")? <Calendar day={day} setDay={setDay} /> : null}
                        </li>
                        <li className={(shown === "user")? styles.activated_item : null} ref={(shown === "user")? ref : null}>
                            <button className={styles.header_nav_list_item_btn} onClick={() => setShown("user")} >
                                <Image
                                src="/user.svg"
                                alt="logo"
                                width={25}
                                height={25}
                                />
                            </button>
                            {(shown === "user")? <User /> : null}
                        </li>
                    </ul>
                </nav>
            </Layout>
        </header>
    )
}