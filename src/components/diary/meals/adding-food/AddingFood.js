"use client";

import styles from "./AddingFood.module.scss";
import { useContext, useState } from "react";
import Arrow from "@/components/buttons/Arrow";
import Search from "./Search";
import UsedFood from "./UsedFood";
import { useOutsideClick } from "@/lib/useOutsideClick";
import { setOpenedContext } from "@/lib/foodContext";

const categories = [
    {id: 0, name: "search", text: "Поиск еды"},
    {id: 1, name: "recent", text: "Недавно употребленные"},
    {id: 2,name: "most", text: "Наиболее употребляемые"},
]


export default function AddingFood() {
    const [category, setCategory] = useState(categories[0]);
    const setOpened = useContext(setOpenedContext);

    const ref = useOutsideClick(() => {
        setOpened(null);
    });
    function handleLeftClick() {
        if (category.id === 0) {
            setCategory(categories[categories.length - 1]);
        } else {
            setCategory(categories[(category.id - 1)]);
        }
    }

    function handleRightlick() {
        if (category.id === categories.length - 1) {
            setCategory(categories[0]);
        } else {
            setCategory(categories[(category.id + 1)]);
        }
    }   

    return (
        <div className={styles.adding}>
            <div className={styles.adding_block} ref={ref}>
                <div className={styles.adding_block_head}>
                    <Arrow direction="left" className={styles.reports_week_arrow} handleClick={handleLeftClick}/>
                    <span>{category.text}</span>
                    <Arrow direction="right" className={styles.reports_week_arrow} handleClick={handleRightlick}/>
                </div>
                {(category === categories[0])? <Search /> : <UsedFood type={category.name}/>}
            </div>
        </div>
    );
}