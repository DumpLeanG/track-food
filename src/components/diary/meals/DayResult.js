import styles from "./DayResult.module.scss";
import { useContext } from "react";
import { DayContext } from "@/lib/DayContext";
import { EatenFoodContext } from "@/lib/EatenFoodContext";


export default function DayResult() {
    const { day } = useContext(DayContext);
    const { eatenFood, isLoading } = useContext(EatenFoodContext);
    const filteredFood = eatenFood.filter((food) => food.date === `${day.getFullYear()}-${day.getMonth() + 1 < 10 ? '0' : ''}${day.getMonth() + 1}-${day.getDate() < 10 ? '0' : ''}${day.getDate()}`);
    const filteredFoodInfo = {
        proteins: filteredFood.reduce((sum, food) => sum + food.proteins, 0),
        fats: filteredFood.reduce((sum, food) => sum + food.fats, 0),
        carbohydrates: filteredFood.reduce((sum, food) => sum + food.carbohydrates, 0),
        calories: filteredFood.reduce((sum, food) => sum + food.calories, 0)
    }

    return (
        <div className={styles.diary_meals_result}>
            <div className={styles.diary_meals_result_names}>
                <span>Белки</span>
                <span>Жиры</span>
                <span>Углеводы</span>
                <span>Калории</span>
            </div>
            <div className={styles.diary_meals_result_numbers}>
                {!isLoading ?
                    <>
                        <span>{Math.round(filteredFoodInfo.proteins * 100) / 100}</span>
                        <span>{Math.round(filteredFoodInfo.fats * 100) / 100}</span>
                        <span>{Math.round(filteredFoodInfo.carbohydrates * 100) / 100}</span>
                        <span>{Math.round(filteredFoodInfo.calories * 100) / 100}</span>
                    </>
                : <div className={styles.diary_meals_result_numbers_load}></div>}
            </div>
        </div>
    );
}