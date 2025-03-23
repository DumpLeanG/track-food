import { useContext} from "react";
import styles from "./Card.module.scss";
import { EatenFoodContext } from "@/lib/EatenFoodContext";

export default function Card({ date, dateText, isActive, handleClick }) {
  const { eatenFood, isLoading } = useContext(EatenFoodContext);
  const filteredFood = eatenFood.filter((food) => food.date === `${date.getFullYear()}-${date.getMonth() + 1 < 10 && '0'}${date.getMonth() + 1}-${date.getDate()}`);
  const totalCalories = filteredFood.reduce((sum, food) => sum + food.calories, 0);

  return (
    isActive ? (
      <li className={`${styles.diary_dates_list_item} ${styles.selected_date}`}>
        <span className={styles.diary_dates_list_item_date}>{dateText}</span>
        <span className={styles.diary_dates_list_item_calories}>
          {isLoading ? 'Загрузка...' : `${totalCalories} ккал`}
        </span>
      </li>
    ) : (
      <li className={`${styles.diary_dates_list_item}`} onClick={handleClick}>
        <span className={styles.diary_dates_list_item_date}>{dateText}</span>
        <span className={styles.diary_dates_list_item_calories}>
          {isLoading ? 'Загрузка...' : `${totalCalories} ккал`}
        </span>
      </li>
    )
  );
}