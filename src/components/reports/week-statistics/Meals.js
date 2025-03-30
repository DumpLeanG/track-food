import styles from "./Meals.module.scss";
import { useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { EatenFoodContext } from "@/lib/EatenFoodContext";

export default function Meals( {currentDates} ) {
    const { eatenFood, isLoading } = useContext(EatenFoodContext);
    const [mealTypes, setMealTypes] = useState([
        {},
        {},
        {},
        {},
    ]);
    const [mealsLoading, setMealsLoading] = useState(true);
    
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
        
    useEffect(() => {
        async function fetchData() {
            setMealsLoading(true);
            const meals = await getMeals();
            setMealTypes(meals);
            setMealsLoading(false);
        }
      
        fetchData();
    }, []);
    
    const filteredFood = eatenFood.filter((food) => 
        food.date >= `${currentDates[0].getFullYear()}-${currentDates[0].getMonth() + 1 < 10 ? '0' : ''}${currentDates[0].getMonth() + 1}-${currentDates[0].getDate() < 10 ? '0' : ''}${currentDates[0].getDate()}` && 
        food.date <= `${currentDates[currentDates.length - 1].getFullYear()}-${currentDates[currentDates.length - 1].getMonth() + 1 < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getMonth() + 1}-${currentDates[currentDates.length - 1].getDate() < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getDate()}`
    );
    const mealsFood = mealTypes.map((mealType) => filteredFood.filter((food) => food.meal_id === mealType.id))

    return (
        <div className={styles.reports_statistics_meals}>
            <div className={styles.reports_statistics_meals_head}>
                <span>Приемы пищи</span>
                <span>Ккал</span>
            </div>
            <ul className={styles.reports_statistics_meals_list}>
                {!isLoading || !mealsLoading ? mealTypes.map((mealType, index) =>(
                    <li key={index} className={styles.reports_statistics_meals_list_item}>
                        <div className={styles.reports_statistics_meals_list_item_name}>
                            <span></span>
                            {mealType.name}
                        </div>
                        <div className={styles.reports_statistics_meals_list_item_calories}>
                            <span>(31%)</span>
                            <span className="green_numbers">{mealsFood[index]?.reduce((sum, food) => sum + food.calories, 0)}</span>
                        </div>
                    </li>
                )) : <div className={styles.reports_statistics_meals_list_load}></div>} 
            </ul>
        </div>
    );
}