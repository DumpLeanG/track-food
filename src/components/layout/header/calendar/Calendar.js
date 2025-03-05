"use client";

import styles from "./Calendar.module.scss";
import Calendar from "react-calendar";
import Image from "next/image";


const options = {
    view: "month",
    minDetail: "month",
    maxDetail: "month",
    next2Label: "",
    prev2Label: "",
    prevLabel: <Image src="/left-arrow.svg" width="14" height="14" alt="left-calendar-arrow"/>,
    nextLabel: <Image src="/right-arrow.svg" width="14" height="14" alt="right-calendar-arrow"/>,
}
  
export default function CalendarWindow( {day, setDay} ) {
    return (
        <div className={styles.calendar}>
            <Calendar {...options} onChange={setDay} value={day}/>
        </div>
    )
}