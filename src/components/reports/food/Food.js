import styles from "./Food.module.scss";
import List from "./List";
import Button from "@/components/layout/buttons/Button";
import { useState, useContext } from "react";
import { EatenFoodContext } from "@/lib/EatenFoodContext";
export default function Food( {currentDates} ) {
    const [showedFood, setShowedFood] = useState(8);
    const { eatenFood } = useContext(EatenFoodContext);
    const filteredFood = eatenFood.filter((food) => food.date >= `${currentDates[0].getFullYear()}-${currentDates[0].getMonth() + 1 < 10 ? '0' : ''}${currentDates[0].getMonth() + 1}-${currentDates[0].getDate() < 10 ? '0' : ''}${currentDates[0].getDate()}` && food.date <= `${currentDates[currentDates.length - 1].getFullYear()}-${currentDates[currentDates.length - 1].getMonth() + 1 < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getMonth() + 1}-${currentDates[currentDates.length - 1].getDate() < 10 ? '0' : ''}${currentDates[currentDates.length - 1].getDate()}`);
    const groupedFood = filteredFood.reduce((result, item) => {
        item.count = 1;
        const existingItem = result.find(i => i.food_id === item.food_id);
        if (existingItem) {
            existingItem.count += 1;
            existingItem.calories += item.calories;
        } else {
            result.push({...item});
        }
        return result;
    }, []);    
    
    function handleClick() {
        if (showedFood >= groupedFood.length) return;
        setShowedFood(prevCount => prevCount + 8);
    }
    
    return (
        <div className={styles.reports_food}>
            <span className={styles.reports_food_title}>Съеденная пища</span>
            <List currentDates={currentDates} food={groupedFood.slice(0, showedFood)}/>
            <Button type="more" onClick={handleClick}/>
        </div>
    );
}