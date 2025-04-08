"use client";

import Button from "@/components/layout/buttons/Button";
import styles from "./User.module.scss";
import Input from "@/components/layout/inputs/Input";
import NumberInput from "@/components/layout/inputs/NumberInput";
import React, { useContext, useState } from 'react';
import { supabase } from "@/lib/supabaseClient";
import { UserContext } from "@/lib/UserContext";
  
export default function User() {
    const [isEditing, setIsEditing] = useState(false);
    const { user, setIsEdited } = useContext(UserContext);
    
    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Ошибка при выходе:", error);
        } else {
            window.location.href = "/";
        }
    };

    const handleChange = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.updateUser({
            email: e.target.email.value,
            data: {
                name: e.target.name.value,
                current_weight: parseFloat(e.target.current_weight.value.split(' ')[0]),
                rda: parseFloat(parseFloat(e.target.rda.value.split(' ')[0]))
            },
        })
        
        if (error) {
            console.error("Ошибка при сохранении изменений:", error);
        } else {
            console.log('Данные пользователя успешно обновлены! Если email был изменен подтвердите его.');
            setIsEdited(true);
            setIsEditing(false);
            return data;
        }
    };

    return (
        (!isEditing) ? <div className={styles.user}>
            {user ? (
                <>
                <span className={styles.user_item}>Имя: <span className={styles.user_item_info}>{user.user_metadata.name}</span></span>
                <span className={styles.user_item}>Эл. адрес: <span className={styles.user_item_info}>{user.email}</span></span>
                <span className={styles.user_item}>Текущий вес: <span className={styles.user_item_info} style={!user.user_metadata.current_weight ? { color: styles.red } : null}>{user.user_metadata.current_weight ? `${user.user_metadata.current_weight} кг` : "не указан"}</span></span>
                <span className={styles.user_item}>РСК: <span className={styles.user_item_info} style={!user.user_metadata.rda ? { color: styles.red } : null}>{user.user_metadata.rda ? `${user.user_metadata.rda} ккал` : "не указан"}</span></span>
                <Button type="edit" onClick={() => setIsEditing(true)} />
                <Button type="exit" onClick={handleSignOut}/>
                </>
            ) : <div className={styles.user_container}>
                <div className={styles.user_container_load}></div>
            </div>}
        </div>
        : <form className={styles.user} onSubmit={handleChange}>
            <Input type="name" defaultValue={user.user_metadata.name ? user.user_metadata.name : ""}/>
            <Input type="email" defaultValue={user.email ? user.email : ""}/>
            <NumberInput defaultValue={user.user_metadata.current_weight ? user.user_metadata.current_weight : ""} measurement="кг" step="0.1" max="300" placeholder="Текущий вес" name="current_weight"/>
            <NumberInput defaultValue={user.user_metadata.rda ? user.user_metadata.rda : ""} measurement="ккал" step="100" max="4000" placeholder="РСК" name="rda"/>
            <Button type="save" />
            <Button type="cancel" onClick={() => setIsEditing(false)} />
        </form>
    );
}