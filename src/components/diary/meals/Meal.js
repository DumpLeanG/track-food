"use client";

import styles from "./Meal.module.scss";
import Image from "next/image";
import AddButton from "@/components/buttons/AddButton";
import ExpandButton from "@/components/buttons/ExpandButton";
import Product from "./Product";
import { useState } from "react";

function renderMealType(type) {
    switch (type) {
        case "breakfast": 
            return "Завтрак"
        case "lunch": 
            return "Обед"
        case "dinner": 
            return "Ужин"
        default: 
            return "Перекус"
    }
}

export default function Meal( { type } ) {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className={styles.diary_meals_item} key={type}>
            <div className={styles.diary_meals_item_head}>
                <div className={styles.diary_meals_item_head_name}>
                    <Image
                        className={styles.header_nav_logo}
                        src={`/${type}.svg`}
                        alt={type}
                        width={20}
                        height={20}
                        priority
                    />
                    <span>{renderMealType(type)}</span>
                </div>
                <AddButton />
            </div>
            <div className={styles.diary_meals_item_numbers}>
                <div className={styles.diary_meals_item_numbers_pfc}>
                    <span>50.92</span>
                    <span>24.05</span>
                    <span>34.08</span>
                </div>
                <div className={styles.diary_meals_item_numbers_calories}>
                    <span>562</span>
                    <ExpandButton isActive={isActive} handleClick={() => setIsActive(!isActive)}/>
                </div>
            </div>
            {
                isActive && 
                <ul className={styles.diary_meals_item_products}>
                    <Product />
                </ul>
            }
        </div>
    );
}