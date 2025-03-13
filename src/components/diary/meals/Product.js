"use client";

import styles from "./Product.module.scss";
import Button from "@/components/buttons/Button";
import { foodContext, setFoodContext, setOpenedContext } from "@/lib/foodContext";
import { useContext } from "react";

export default function Product( {product} ) {
    const setFood = useContext(setFoodContext);
    const setOpened = useContext(setOpenedContext);

    function handleClick() {
        setOpened("parameters");
        setFood(product);
    }

    return (
        <li className={styles.diary_meals_item_products_item}>
            <div className={styles.diary_meals_item_products_item_info}>
                <span className={styles.diary_meals_item_products_item_info_name}>{product.name}</span>
                <span className={styles.diary_meals_item_products_item_info_weight}>15 г</span>
            </div>
            <div className={styles.diary_meals_item_products_item_info}>
                <div className={styles.diary_meals_item_products_item_info_pfc}>
                    <span>1.8</span>
                    <span>0.3</span>
                    <span>0.6</span>
                </div>
                <span className={styles.diary_meals_item_products_item_info_calories}>12</span>
            </div>
            <div className={styles.diary_meals_item_products_item_info}>
                <Button type="edit" onClick={handleClick}/>
                <Button type="delete" />
            </div>
        </li>
    );
}