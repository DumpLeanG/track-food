"use client";

import styles from "./Product.module.scss";
import Button from "@/components/layout/buttons/Button";
import { FoodContext } from "@/lib/FoodContext";
import { useContext } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Product( {product, onDelete} ) {
    const { setFood, setOpened } = useContext(FoodContext);

    function handleClick() {
        setOpened("parameters");
        setFood(product);
    }

    async function deleteRecordById(id) {
        const { data, error } = await supabase
          .from('eaten_food') // Указываем таблицу
          .delete() // Вызываем метод удаления
          .eq('id', id); // Указываем условие: удалить запись с определённым id
      
        if (error) {
          console.error('Ошибка при удалении записи:', error);
          return null;
        }
        
        return data;
    }

    async function handleDelete() {
        await deleteRecordById(product.id);
        onDelete(product.id);
    }

    return (
        <li className={styles.diary_meals_item_products_item}>
            <div className={styles.diary_meals_item_products_item_info}>
                <span className={styles.diary_meals_item_products_item_info_name}>{product.name}</span>
                <span className={styles.diary_meals_item_products_item_info_weight}>{product.amount} {product.serving}</span>
            </div>
            <div className={styles.diary_meals_item_products_item_info}>
                <div className={styles.diary_meals_item_products_item_info_pfc}>
                    <span>{product.proteins}</span>
                    <span>{product.fats}</span>
                    <span>{product.carbohydrates}</span>
                </div>
                <span className={styles.diary_meals_item_products_item_info_calories}>{product.calories}</span>
            </div>
            <div className={styles.diary_meals_item_products_item_info}>
                <Button type="edit" onClick={handleClick}/>
                <Button type="delete" onClick={() => handleDelete(product.id)}/>
            </div>
        </li>
    );
}