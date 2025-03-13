"use client";

import Button from "@/components/buttons/Button";
import styles from "./User.module.scss";
import Input from "@/components/inputs/Input";
import NumberInput from "@/components/inputs/NumberInput";
import React, { useState, useEffect, useRef } from 'react';

const restEndpoint = "https://randomuser.me/api/";
  
export default function User( {apiResponse, setApiResponse} ) {
    const [isEditing, setIsEditing] = useState(false);
    const hasFetchedData = useRef(false);

    useEffect(() => {
        async function fetchUser() {
                fetch(restEndpoint)
                .then(response => response.json())
                .then(result => {
                    setApiResponse(result)
                    console.log(result);
                })
                .catch(e => console.error('Error fetching data:', e));
                
        }
        if (hasFetchedData.current === false) {
            fetchUser();
            hasFetchedData.current = true;
          } 
    }, [hasFetchedData, setApiResponse]);

    return (
        (!isEditing) ? <div className={styles.user}>
            <span className={styles.user_item}>Имя: <span className={styles.user_item_info}>{(apiResponse.results)? apiResponse.results[0].name.first : apiResponse}</span></span>
            <span className={styles.user_item}>Эл. адрес: <span className={styles.user_item_info}>{(apiResponse.results)? apiResponse.results[0].email : apiResponse}</span></span>
            <span className={styles.user_item}>Текущий вес: <span className={styles.user_item_info}>71,4 кг</span></span>
            <span className={styles.user_item}>РСК: <span className={styles.user_item_info}>1500 ккал</span></span>
            <Button type="edit" onClick={() => setIsEditing(true)} />
            <Button type="exit" onClick={() => window.location = "/"}/>
        </div>
            : <form className={styles.user}>
                <Input type="name" />
                <Input type="email" />
                <NumberInput defaultValue="71.4" measurement="кг" step="0.1" max="300"/>
                <NumberInput defaultValue="1500" measurement="ккал" step="100" max="4000"/>
                <Button type="save" />
                <Button type="cancel" onClick={() => setIsEditing(false)} />
            </form>
    );
}