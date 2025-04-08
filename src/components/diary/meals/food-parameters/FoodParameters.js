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

    const selectedFood = useRef();

    useEffect(() => {
        if(food.id) {
            selectedFood.current = food;
        }
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

    useEffect(() => {
        async function fetchData() {
            if (!food?.food_id) return;
            setIsLoading(true);
            try {
                let foodData = food;
                
                if (!food.servings) {
                    const data = await fetchFoodDetails(food.food_id);
                    if (data) {
                        foodData = data;
                        setFood(data);
                    }
                }

                if (!foodData.servings?.serving) return;

                const targetServing = foodData.servings.serving[0] ? foodData.servings.serving.find(
                    serving => serving.measurement_description === (selectedFood.current?.serving || foodData.servings.serving[0]?.measurement_description)
                ) || foodData.servings.serving[0] : foodData.servings.serving;

                if (targetServing) {
                    setSelectedServing(targetServing);
                    setInfo({
                        amount: selectedFood.current?.amount || +targetServing.number_of_units,
                        calories: selectedFood.current?.calories || +targetServing.calories,
                        proteins: selectedFood.current?.proteins || +targetServing.protein,
                        fats: selectedFood.current?.fats || +targetServing.fat,
                        carbohydrates: selectedFood.current?.carbohydrates || +targetServing.carbohydrate,
                    });
                }
            } catch (error) {
                console.error("Error fetching food details:", error);
            } finally {
                 setIsLoading(false);
            }
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

        if (error) {
            console.error('Ошибка при изменении записи:', error);
            return null;
        }

        console.log('Запись успешно обновлена!');
        return true;
    }

    const handleSave = async (e) => {
        e.preventDefault();
        const result = previousOpened.current === "adding" ? await addEatenFood(food.food_id, food.food_name, selectedServing.measurement_description, info, day, mealId, user.id) : await editEatenFood(selectedFood.current.id, food.food_id, food.food_name, selectedServing.measurement_description, info, day, mealId, user.id);
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
                {food.servings?.serving[0] ? food.servings?.serving.map((serving) => (
                <option key={serving.serving_id} value={serving.serving_id}>
                    {serving.measurement_description}
                </option>
                )) :
                <option key={food.servings.serving.serving_id} value={food.servings.serving.serving_id}>
                    {food.servings.serving.measurement_description}
                </option>}
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