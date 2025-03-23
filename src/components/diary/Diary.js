"use client";

import Layout from "../layout/Layout";
import Dates from "./dates/Dates";
import Meals from "./meals/Meals";
import styles from "./Diary.module.scss";
import Statistics from "./statistics/Statistics";
import { useState, useEffect, useContext } from "react";
import { EatenFoodContext } from "@/lib/EatenFoodContext";
import { supabase } from "@/lib/supabaseClient";
import { UserContext } from "@/lib/UserContext";

export default function Diary() {
    const [eatenFood, setEatenFood] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user }  = useContext(UserContext);

    async function fetchEatenFood(user) {
        const { data, error } = await supabase
            .from('eaten_food')
            .select('*')
            .eq('user_id', user.id);
    
        if (error) {
            console.error('Ошибка при загрузке данных:', error);
        }

        return data;
    }

    useEffect(() => {
        if(user) {
            async function fetchData() {
                setIsLoading(true);
                const result = await fetchEatenFood(user);
                setEatenFood(result);
                setIsLoading(false);
            }
            
            fetchData();
        }
      }, [user]);
    
    return (
        <section className={styles.diary}>
            <EatenFoodContext.Provider value={{ eatenFood, setEatenFood, fetchEatenFood, setIsLoading, isLoading }}>
                <Layout>
                    <Dates/>
                    <Meals/>
                    <Statistics />
                </Layout>
            </EatenFoodContext.Provider>
        </section>
    );
}