"use client";

import { setOpenedContext, foodContext, setFoodContext } from "@/lib/foodContext";
import styles from "./FoodParameters.module.scss";
import { useOutsideClick } from "@/lib/useOutsideClick";
import Image from "next/image";
import { useContext, useState } from "react";
import Button from "@/components/buttons/Button";

export default function FoodParameters({ previous }) {
    const setOpened = useContext(setOpenedContext);
    const food = useContext(foodContext);
    const setFood = useContext(setFoodContext);
    const [selectedServing, setSelectedServing] = useState(food.servings.serving[0]);

    const ref = useOutsideClick(() => {
        setOpened(previous);
        setFood(null);
    });

    const handleServingChange = (e) => {
        const selectedId = e.target.value;
        const selectedServing = food.servings.serving.find(
            (serving) => serving.serving_id === selectedId
        );
        setSelectedServing(selectedServing);
    };

    return (
        <div className={styles.parameters}>
            <form className={styles.parameters_block} ref={ref}>
                <span className={styles.parameters_block_title}>
                    {food.food_name} {food.food_type === "Brand" && `(${food.brand_name})`}
                </span>
                <div className={styles.parameters_block_element}>
                    <Image src="/weight.svg" width={24} height={24} alt="weight-icon" />
                    <input
                        type="number"
                        className={styles.parameters_block_element_input}
                        min={1}
                        defaultValue={100}
                        max={10000}
                        step={1}
                    />
                </div>
                <div className={styles.parameters_block_element}>
                    <Image src="/units.svg" width={24} height={24} alt="units-icon" />
                    <select
                        className={styles.parameters_block_element_input}
                        onChange={handleServingChange}
                        value={selectedServing.serving_id}
                    >
                        {food.servings.serving.map((serving) => (
                            <option key={serving.serving_id} value={serving.serving_id}>
                                {serving.serving_description}
                            </option>
                        ))}
                    </select>
                    <Image
                        src="/expand.svg"
                        width={16}
                        height={16}
                        alt="expand-icon"
                        className={styles.parameters_block_element_expand}
                    />
                </div>
                <Button type="save" />
                <ul className={styles.parameters_block_info}>
                    <li className={styles.parameters_block_info_item}>
                        Ккал: {selectedServing.calories}
                    </li>
                    <li className={styles.parameters_block_info_item}>
                        Белок: {selectedServing.protein} г
                    </li>
                    <li className={styles.parameters_block_info_item}>
                        Жир: {selectedServing.fat} г
                    </li>
                    <li className={styles.parameters_block_info_item}>
                        Углев: {selectedServing.carbohydrate} г
                    </li>
                </ul>
            </form>
        </div>
    );
}