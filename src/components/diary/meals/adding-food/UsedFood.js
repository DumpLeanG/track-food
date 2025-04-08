"use client";

import { useContext, useEffect, useRef, useState } from "react";
import styles from "./UsedFood.module.scss";
import Item from "./Item";
import { EatenFoodContext } from "@/lib/EatenFoodContext";
import { DayContext } from "@/lib/DayContext";

let items = [];

export default function UsedFood( {type} ) {
    const { eatenFood } = useContext(EatenFoodContext);
    const { day } = useContext(DayContext);
    const today = useRef(null);
    const [recentFood, setRecentFood] = useState([]);
    const [mostEatenFood, setMostEatenFood] = useState([]);

    useEffect(() => {
        if(day) {
            today.current = day;
            const filteredRecentFood = eatenFood.filter((food) => food.date >= `${today.current.getFullYear()}-${today.current.getMonth() < 10 ? '0' : ''}${today.current.getMonth()}-${today.current.getDate() < 10 ? '0' : ''}${today.current.getDate()}` && food.date <= `${today.current.getFullYear()}-${today.current.getMonth() + 1 < 10 ? '0' : ''}${today.current.getMonth() + 1}-${today.current.getDate() < 10 ? '0' : ''}${today.current.getDate()}`);
            const groupedRecentFood = filteredRecentFood.reduce((result, item) => {
                    const existingItem = result.find(i => i.food_id === item.food_id);
                    if (!existingItem) {
                        result.push({...item});
                    }
                    return result;
            }, [])
            setRecentFood(groupedRecentFood);

            const groupedMostEatenFood = eatenFood.reduce((result, item) => {
                const existingItem = result.find(i => i.food_id === item.food_id);
                if (existingItem) {
                    existingItem.count += 1;
                } else {
                    result.push({
                        ...item,
                        count: 1,
                    });
                }
                return result;
            }, []);

            const topMostEatenFood = groupedMostEatenFood
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
            console.log(topMostEatenFood);
            setMostEatenFood(topMostEatenFood);
        }
    },[day, eatenFood])

    {(type === "recent")
        ? items = [...recentFood] 
        : items = [...mostEatenFood]}

    return (
        <div className={styles.adding_block_used}>
            <ul className={styles.adding_block_list}>
                {items.map(item => 
                    <Item key={item.food_id} item={item} className={styles.adding_block_list_item} type="add" />
                )}
            </ul>
        </div>
    );
}