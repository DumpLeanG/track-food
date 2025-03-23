"use client";

import styles from "./Meals.module.scss";
import DayResult from "./DayResult";
import Meal from "./Meal";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LoadingContext } from "@/lib/LoadingContext";


export default function Meals() {
    const [mealTypes, setMealTypes] = useState([
      {},
      {},
      {},
      {},
    ]);
    const [isLoading, setIsLoading] = useState(true);

    async function getMeals() {
        const { data, error } = await supabase
          .from('meals')
          .select('*');
    
        if (error) {
          console.error('Ошибка при выполнении запроса:', error);
          return null;
        }
        return data;
      }
    
      // Используем useEffect для выполнения асинхронного запроса
      useEffect(() => {
        async function fetchData() {
          setIsLoading(true);
          const meals = await getMeals();
          setMealTypes(meals);
          setIsLoading(false);
        }
      
        fetchData();
      }, []); // Зависимость от date, чтобы запрос выполнялся при изменении даты

    return (
        <div className={styles.diary_meals}>
          <LoadingContext.Provider value={isLoading}>
              <DayResult/>
              {isLoading
                ? mealTypes.map((meal, index) => (
                  <Meal key={index} type={{name: "Загрузка"}}/>
                ))
                : mealTypes.map(meal => (
                  <Meal key={meal.id} type={meal}/>
                ))
              }
            </LoadingContext.Provider>
        </div>
    );
}