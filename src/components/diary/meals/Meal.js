import styles from "./Meal.module.scss";
import Image from "next/image";
import AddButton from "@/components/layout/buttons/AddButton";
import ExpandButton from "@/components/layout/buttons/ExpandButton";
import Product from "./Product";
import { useState, useRef, useEffect, useContext } from "react";
import AddingFood from "./adding-food/AddingFood";
import { FoodContext } from "@/lib/FoodContext";
import FoodParameters from "./food-parameters/FoodParameters";
import { DayContext } from "@/lib/DayContext";
import { LoadingContext } from "@/lib/LoadingContext";
import { UserContext } from "@/lib/UserContext";
import { EatenFoodContext } from "@/lib/EatenFoodContext";

export default function Meal( { type } ) {
    const [isActive, setIsActive] = useState(false);
    const [opened, setOpened] = useState(null);
    const [food, setFood] = useState(null);
    const { day } = useContext(DayContext);
    const mealsLoading = useContext(LoadingContext);
    const { user } = useContext(UserContext);
    const { eatenFood, setEatenFood, fetchEatenFood, setIsLoading, isLoading } = useContext(EatenFoodContext);
    const filteredFood = eatenFood.filter((food) => food.date === `${day.getFullYear()}-${day.getMonth() + 1 < 10 && '0'}${day.getMonth() + 1}-${day.getDate()}` && food.meal_id === type.id);
    const filteredFoodInfo = {
        proteins: filteredFood.reduce((sum, food) => sum + food.proteins, 0),
        fats: filteredFood.reduce((sum, food) => sum + food.fats, 0),
        carbohydrates: filteredFood.reduce((sum, food) => sum + food.carbohydrates, 0),
        calories: filteredFood.reduce((sum, food) => sum + food.calories, 0)
    }

    const openedRef = useRef();
    
    useEffect(() => {
        openedRef.current = opened;
    },[opened])

    const handleDeleteProduct = () => {
        async function fetchData() {
            setIsLoading(true);
            const result = await fetchEatenFood(user);
            setEatenFood(result);
            setIsLoading(false);
        }
        fetchData();
    };

    const handleAddProduct = () => {
        async function fetchData() {
            setIsLoading(true);
            const result = await fetchEatenFood(user);
            setEatenFood(result);
            setIsLoading(false);
        }
        fetchData();
    }

    return (
        <div className={styles.diary_meals_item} key={type}>
            <div className={styles.diary_meals_item_head}>
                {!mealsLoading ? <>
                <div className={styles.diary_meals_item_head_name}>
                        <Image
                            src={`/${type.name === "Завтрак" ? "breakfast" : (type.name === "Обед" ? "lunch" : (type.name === "Ужин" ? "dinner" : (type.name === "Перекус" && "snack")))}.svg`}
                            alt={`/${type.name === "Завтрак" ? "breakfast" : (type.name === "Обед" ? "lunch" : (type.name === "Ужин" ? "dinner" : (type.name === "Перекус" && "snack")))}`}
                            width={20}
                            height={20}
                            priority
                        /> 
                        <span>{type.name}</span>
                </div>
                <AddButton handleClick={() => setOpened("adding")}/>
                </>
                : <>
                    <div className={styles.diary_meals_item_head_name_load}></div>
                </>}
            </div>
            <div className={styles.diary_meals_item_numbers}>
                {!isLoading ? <>
                    <div className={styles.diary_meals_item_numbers_pfc}>
                        <span>{Math.round(filteredFoodInfo.proteins * 100) / 100}</span>
                        <span>{Math.round(filteredFoodInfo.fats * 100) / 100}</span>
                        <span>{Math.round(filteredFoodInfo.carbohydrates * 100) / 100}</span>
                    </div>
                    <div className={styles.diary_meals_item_numbers_calories}>
                        <span>{Math.round(filteredFoodInfo.calories * 100) / 100}</span>
                        <ExpandButton isActive={isActive} handleClick={() => setIsActive(!isActive)}/>
                    </div>
                </>
                : <div className={styles.diary_meals_item_head_name_load}></div>}
            </div>
            {
                isActive && 
                <ul className={styles.diary_meals_item_products}>
                    <FoodContext.Provider value={{food, setFood, setOpened}}>
                        {filteredFood?.map((product) => (
                            <Product key={product.id} product={product} onDelete={handleDeleteProduct}/>
                        ))}
                    </FoodContext.Provider>
                </ul>
            }
            {opened === "adding" 
                ? <FoodContext.Provider value={{food, setFood, setOpened}}>
                        <AddingFood/>
                </FoodContext.Provider>
            : (opened === "parameters" && 
                <FoodContext.Provider value={{food, setFood, setOpened}}>
                    <FoodParameters previous={openedRef.current} mealId={type.id} onUpdate={handleAddProduct}/>
                </FoodContext.Provider>
            )}

        </div>
    );
}