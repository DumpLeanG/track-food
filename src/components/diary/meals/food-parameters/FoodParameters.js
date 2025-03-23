"use client";

import { FoodContext } from "@/lib/FoodContext";
import styles from "./FoodParameters.module.scss";
import { useOutsideClick } from "@/lib/useOutsideClick";
import Image from "next/image";
import { useContext, useState, useEffect, useRef} from "react";
import Button from "@/components/layout/buttons/Button";
import { supabase } from "@/lib/supabaseClient";
import { DayContext } from "@/lib/DayContext";
import { UserContext } from "@/lib/UserContext";

export default function FoodParameters({ previous, mealId, onUpdate }) {
    const { food, setFood, setOpened } = useContext(FoodContext);
    const { day } = useContext(DayContext);
    const { user } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedServing, setSelectedServing] = useState(null);
    const [isClosed, setIsClosed] = useState(false);
    const [info, setInfo] = useState({
        amount: 0,
        calories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
    });

    const foodId = useRef();

    useEffect(() => {
        if(food.id) {
            foodId.current = food.id;
        }
        setIsClosed(true);
    },[food])

    const previousOpened = useRef();
    
    useEffect(() => {
        if(!isClosed) {
            previousOpened.current = previous;
        }
        setIsClosed(true);
    },[previous, isClosed])

    const ref = useOutsideClick(() => {
        setOpened(previousOpened.current);
        setFood(null);
    });

    async function fetchFoodDetails(foodId) {
        try {
            const tokenResponse = await fetch('/api/get-token', {
                method: 'POST',
            });
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            const foodResponse = await fetch(`/api/get-food?foodId=${foodId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await foodResponse.json();
            return data;

        } catch (error) {
            console.error("Ошибка при запросе к API:", error);
            return null;
        }
    }

    // Проверяем наличие servings и делаем запрос, если их нет
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            if (!food?.servings) {
                const data = await fetchFoodDetails(food.food_id);
                if (data) {
                    // Обновляем состояние food с новыми данными
                    setFood(data);

                    // Устанавливаем первый serving по умолчанию
                    setSelectedServing(data.servings.serving[0]);
                    setInfo({
                        amount: +data.servings.serving[0].number_of_units,
                        calories: +data.servings.serving[0].calories,
                        proteins: +data.servings.serving[0].protein,
                        fats: +data.servings.serving[0].fat,
                        carbohydrates: +data.servings.serving[0].carbohydrate,
                    });
                }
            } else {
            // Если servings уже есть, устанавливаем первый serving по умолчанию
                setSelectedServing(food.servings.serving[0]);
                setInfo({
                    amount: +food.servings.serving[0].number_of_units,
                    calories: +food.servings.serving[0].calories,
                    proteins: +food.servings.serving[0].protein,
                    fats: +food.servings.serving[0].fat,
                    carbohydrates: +food.servings.serving[0].carbohydrate,
                });
                }
            setIsLoading(false);
        }

        fetchData();
    }, [food, setFood]);

    const handleServingChange = (e) => {
        const selectedId = e.target.value;
        const selectedServing = food.servings.serving.find(
            (serving) => serving.serving_id === selectedId
        );
        setSelectedServing(selectedServing);
        setInfo({
            amount: +selectedServing.number_of_units,
            calories: +selectedServing.calories,
            proteins: +selectedServing.protein,
            fats: +selectedServing.fat,
            carbohydrates: +selectedServing.carbohydrate,
        });
    };

    async function addEatenFood(food_id, name, serving, info, date, meal_id, user_id) {
        const { data, error } = await supabase
        .from('eaten_food')
        .insert({
            food_id,
            name,
            serving,
            ...info,
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            meal_id,
            user_id
        });

        if (error) {
            console.error('Ошибка при добавлении записи:', error);
            return null;
        }

        console.log('Запись успешно добавлена!');
        return true;
    }

    async function editEatenFood(id, food_id, name, serving, info, date, meal_id, user_id) {
        const { data, error } = await supabase
        .from('eaten_food')
        .update({
            food_id,
            name,
            serving,
            ...info,
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            meal_id,
            user_id
        })
        .eq('id', id);

        console.log({
            food_id,
            name,
            serving,
            ...info,
            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            meal_id,
            user_id
        })

        if (error) {
            console.error('Ошибка при изменении записи:', error);
            return null;
        }

        console.log('Запись успешно обновлена!');
        return true;
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const result = previousOpened.current === "adding" ? await addEatenFood(food.food_id, food.food_name, selectedServing.measurement_description, info, day, mealId, user.id) : await editEatenFood(foodId.current, food.food_id, food.food_name, selectedServing.measurement_description, info, day, mealId, user.id);
        if (result) {
            setOpened(null);
            onUpdate();
        }
    }

    return (
        !isLoading &&
        <div className={styles.parameters}>
        <form className={styles.parameters_block} ref={ref} onSubmit={handleSave}>
            <span className={styles.parameters_block_title}>
            {food.food_name} {food.food_type === "Brand" && `(${food.brand_name})`}
            </span>
            <div className={styles.parameters_block_element}>
            <Image src="/weight.svg" width={24} height={24} alt="weight-icon" />
            <input
                type="number"
                className={styles.parameters_block_element_input}
                min={1}
                value={info.amount}
                onChange={(e) =>
                setInfo({
                    amount: e.target.value,
                    calories: Math.round((e.target.value / selectedServing.number_of_units) * selectedServing.calories * 100) / 100,
                    proteins: Math.round((e.target.value / selectedServing.number_of_units) * selectedServing.protein * 100) / 100,
                    fats: Math.round((e.target.value / selectedServing.number_of_units) * selectedServing.fat * 100) / 100,
                    carbohydrates: Math.round((e.target.value / selectedServing.number_of_units) * selectedServing.carbohydrate * 100) / 100,
                })
                }
                max={10000}
                step={1}
                name="amount"
            />
            </div>
            <div className={styles.parameters_block_element}>
            <Image src="/units.svg" width={24} height={24} alt="units-icon" />
            <select
                className={styles.parameters_block_element_input}
                onChange={handleServingChange}
                value={selectedServing?.serving_id}
            >
                {food.servings?.serving.map((serving) => (
                <option key={serving.serving_id} value={serving.serving_id}>
                    {serving.measurement_description}
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
            <Button type="save"/>
            <ul className={styles.parameters_block_info}>
            <li className={styles.parameters_block_info_item}>
                Ккал: {info.calories}
            </li>
            <li className={styles.parameters_block_info_item}>
                Белок: {info.proteins} г
            </li>
            <li className={styles.parameters_block_info_item}>
                Жир: {info.fats} г
            </li>
            <li className={styles.parameters_block_info_item}>
                Углев: {info.carbohydrates} г
            </li>
            </ul>
        </form>
        </div>
    );
}