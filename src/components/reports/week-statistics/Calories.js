import { useContext } from "react";
import styles from "./Calories.module.scss";
import { UserContext } from "@/lib/UserContext";
import { EatenFoodContext } from "@/lib/EatenFoodContext";

export default function Calories( {currentDates} ) {
    const { user } = useContext(UserContext);
    const { eatenFood, isLoading } = useContext(EatenFoodContext);
    const filteredFood = eatenFood.filter((food) => food.date >= `${currentDates[0].getFullYear()}-${currentDates[0].getMonth() + 1 < 10 ? '0' : ''}${currentDates[0].getMonth() + 1}-${currentDates[0].getDate() < 10 ? '0' : ''}${currentDates[0].getDate()}` && food.date <= `${currentDates[currentDates.length - 1].getFullYear()}-${currentDates[currentDates.length - 1].getMonth() + 1 < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getMonth() + 1}-${currentDates[currentDates.length - 1].getDate() < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getDate()}`);
    const totalCalories = filteredFood.reduce((sum, food) => sum + food.calories, 0);
    return (
        <div className={styles.reports_statistics_calories}>
            {isLoading ? <div className={styles.reports_statistics_calories_load}></div>
            : <>
                <span>Калории: <span className="green_numbers">{totalCalories}</span></span>
                <div>
                    <span>Среднесуточная норма: <span className="green_numbers">{Math.round(totalCalories / 7 * 100) / 100}</span></span>
                    <span>Цель: {user?.user_metadata?.rda}</span>
                </div>
            </>}
            
        </div>
    );
}