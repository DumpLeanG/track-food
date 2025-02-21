"use client";

import styles from './Auth.module.scss';
import Button from '../buttons/Button';
import Login from './Login';
import Registration from './Registration';
import { useState } from 'react';

export default function Auth() {
    const [activeItem, setActiveItem] = useState("Login");
    return (
        <section className={styles.auth}>
            <form className={styles.auth_form} action="/tracker">
                <div className={styles.auth_form_head}>
                    <span className={`${styles.auth_form_head_item} ${(activeItem) === "Login" ? styles.active_item : null}`} onClick={() => setActiveItem("Login")}>Вход</span>
                    <span className={`${styles.auth_form_head_item} ${(activeItem) === "Registration" ? styles.active_item : null}`} onClick={() => setActiveItem("Registration")}>Регистрация</span>
                </div>
                {(activeItem === "Login")
                ? <Login className={styles.auth_form_box}/>
                : <Registration className={styles.auth_form_box}/>}
            </form>
        </section>
    );
}