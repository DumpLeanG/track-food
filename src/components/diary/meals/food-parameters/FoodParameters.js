"use client";

import { setOpenedContext, foodContext, setFoodContext } from "@/lib/foodContext";
import styles from "./FoodParameters.module.scss";
import { useOutsideClick } from "@/lib/useOutsideClick";
import Image from "next/image";
import { useContext } from "react";
import Button from "@/components/buttons/Button";

export default function FoodParameters() {
    const setOpened = useContext(setOpenedContext);
    const food = useContext(foodContext);
    const setFood = useContext(setFoodContext);
    const ref = useOutsideClick(() => {
        setOpened("adding");
        setFood(null);
    });

    return (
        <div className={styles.parameters}>
            <form className={styles.parameters_block} ref={ref}>
                <span className={styles.parameters_block_title}>{food.name}</span>
                <div className={styles.parameters_block_element}>
                    <Image src="/weight.svg" width={24} height={24} alt="weight-icon"/>
                    <input type="number" className={styles.parameters_block_element_input} min={1} defaultValue={100} max={10000} step={1}/>
                </div>
                <div className={styles.parameters_block_element}>
                    <Image src="/units.svg" width={24} height={24} alt="units-icon"/>
                    <select type="text" className={styles.parameters_block_element_input}>
                        <option value="g">г</option>
                        <option value="kg">кг</option>
                        <option value="ml">мл</option>
                    </select>
                    <Image src="/expand.svg" width={16} height={16} alt="expand-icon" className={styles.parameters_block_element_expand}/>
                </div>
                <Button type="save" />
                <ul className={styles.parameters_block_info}>
                    <li className={styles.parameters_block_info_item}>Ккал: 110</li>
                    <li className={styles.parameters_block_info_item}>Жир: 5 г</li>
                    <li className={styles.parameters_block_info_item}>Углев: 4 г</li>
                    <li className={styles.parameters_block_info_item}>Белок: 12 г</li>
                </ul>
            </form>
        </div>
    );
}