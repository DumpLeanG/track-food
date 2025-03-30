"use client"

import Layout from "../layout/Layout";
import styles from "./Reports.module.scss";
import WeekStatistics from "./week-statistics/WeekStatistics";
import Week from "./week/Week";
import Food from "./food/Food";
import { useState, useEffect, useContext } from "react";
import { getWeekDays } from "@/lib/getWeekDays";
import { DayContext } from "@/lib/DayContext";
import { UserContext } from "@/lib/UserContext";
import { EatenFoodContext } from "@/lib/EatenFoodContext";
import { supabase } from "@/lib/supabaseClient";

export default function Reports() {
    const { day, setDay } = useContext(DayContext);
    const [week, setWeek] = useState("Текущая неделя");
    let currentDates = getWeekDays(day);
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

    useEffect(() => {
        const previousDay = new Date();
        if(previousDay.toDateString() !== day.toDateString()) {
            setWeek(`${currentDates[0].toLocaleDateString()} - ${currentDates[currentDates.length - 1].toLocaleDateString()}`);
        } else {
            setWeek('Текущая неделя');
        }
    }, [day, currentDates])

    function handleLeftClick() {
        setDay(new Date(day.setDate(day.getDate() - 7)));
    }

    function handleRightClick() {
        setDay(new Date(day.setDate(day.getDate() + 7)));
    }

    return (
        <section className={styles.reports}>
            <EatenFoodContext.Provider value={{ eatenFood, setEatenFood, fetchEatenFood, setIsLoading, isLoading }}>
                <Layout>
                    <Week handleLeftClick={handleLeftClick} handleRightClick={handleRightClick} week={week}/>
                    <WeekStatistics currentDates={currentDates}/>
                    <Food currentDates={currentDates}/>
                </Layout>
            </EatenFoodContext.Provider>
            
        </section>
    );
}