import styles from "./Summary.module.scss";
import { useContext } from "react";
import { EatenFoodContext } from "@/lib/EatenFoodContext";
import { DayContext } from "@/lib/DayContext";
import { UserContext } from "@/lib/UserContext";

export default function Summary() {
    const { eatenFood } = useContext(EatenFoodContext);
    const { day } = useContext(DayContext);
    const filteredFood = eatenFood.filter((food) => food.date === `${day.getFullYear()}-${day.getMonth() + 1 < 10 ? '0' : ''}${day.getMonth() + 1}-${day.getDate() < 10 ? '0' : ''}${day.getDate()}`);
    const filteredFoodCalories = filteredFood.reduce((sum, food) => sum + food.calories, 0);
    const { user } = useContext(UserContext);

    return (
        <div className={styles.diary_statistics_summary}>
            <div className={styles.diary_statistics_summary_line}>
                <div className={styles.diary_statistics_summary_line_fill} style={{width: `${5.4 * (filteredFoodCalories / user?.user_metadata?.rda * 100) || 0}px`, background: (user?.user_metadata.rda && filteredFoodCalories) && styles.mixPurple}}>
                    <span>{Math.round(filteredFoodCalories / user?.user_metadata?.rda * 100 * 100) / 100 || 0}% от РСК</span>
                </div>
            </div>
            <h2>Сводка</h2>
            <div className={styles.diary_statistics_summary_text}>
                <p>Употреблено калорий <span>{filteredFoodCalories}</span></p>
            </div>
            <div className={styles.diary_statistics_summary_text}>
                <p>Осталось калорий <span>{Math.round((user?.user_metadata?.rda - filteredFoodCalories) * 100) / 100 || 0}</span></p>
            </div>
            <hr />
            <div className={styles.diary_statistics_summary_text}>
                <p>РСК <span>{user?.user_metadata?.rda || 0}</span></p>
            </div>
        </div>
    );
}