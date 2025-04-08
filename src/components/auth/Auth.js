"use client";

import styles from './Auth.module.scss';
import Login from './Login';
import Registration from './Registration';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Auth() {
    const [activeItem, setActiveItem] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChangeActiveItem = () => {
        if (activeItem === "Login") {
            setActiveItem("Registration");
        } else {
            setActiveItem("Login");
        }
        setError(null);
        setSuccess(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    }

    async function checkUserExists(email) {
        const { data, error } = await supabase
            .from('profiles')
            .select('email')
            .eq('email', email)
            .maybeSingle();
    
        if (error) {
            setError(error);
            throw error;
        }
    
        return data !== null;
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
    
        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }
    
        if (password.length < 8) {
            setError("Пароль должен содержать не менее 8 символов");
            return;
        }

        const exists = await checkUserExists(email);
        if (exists) {
            setError("Пользователь с таким email уже зарегистрирован");
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name,
                }
            }
        });

        if (error) {
            setError(error.message);
        } else {
            setActiveItem("Login");
            setSuccess(true);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            window.location.href = "/tracker";
        }
    };
    
    return (
        <section className={styles.auth}>
            <form className={styles.auth_form} onSubmit={(activeItem === "Registration" ? handleSignUp : handleSignIn )}>
                <div className={styles.auth_form_head}>
                    <span className={`${styles.auth_form_head_item} ${(activeItem) === "Login" && styles.active_item}`} onClick={handleChangeActiveItem}>Вход</span>
                    <span className={`${styles.auth_form_head_item} ${(activeItem) === "Registration" && styles.active_item}`} onClick={handleChangeActiveItem}>Регистрация</span>
                </div>
                {error && <p className={styles.auth_form_txt} style={{ color: styles.red }}>{error}</p>}
                {success && <p className={styles.auth_form_txt} style={{ color: styles.green }}>Пользователь успешно зарегистрирован! Подтвердите email.</p>}
                {(activeItem === "Login")
                ? <Login className={styles.auth_form_box} email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
                : <Registration className={styles.auth_form_box} name={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}/>}
            </form>
        </section>
    );
}