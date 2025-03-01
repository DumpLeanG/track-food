"use client"

import Layout from "../layout/Layout";
import styles from "./Reports.module.scss";
import WeekStatistics from "./week-statistics/WeekStatistics";
import Week from "./week/Week";
import Food from "./food/Food";
import { useState, useEffect, useContext } from "react";
import { getWeekDays } from "@/lib/getWeekDays";
import { dayContext, setDayContext } from "@/lib/dayContext";

export default function Reports() {
    const day = useContext(dayContext);
    const setDay = useContext(setDayContext);
    const [week, setWeek] = useState("Текущая неделя");
    let currentDates = getWeekDays(day);

    useEffect(() => {
        const previousDay = new Date();
        if(previousDay.toDateString() !== day.toDateString()) {
            setWeek(`${currentDates[0].toLocaleDateString()} - ${currentDates[currentDates.length - 1].toLocaleDateString()}`);
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
            <Layout>
                <Week handleLeftClick={handleLeftClick} handleRightClick={handleRightClick} week={week}/>
                <WeekStatistics currentDates={currentDates}/>
                <Food />
            </Layout>
        </section>
    );
}