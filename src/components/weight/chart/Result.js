import styles from "./Result.module.scss";
import { UserContext } from "@/lib/UserContext";
import { useContext } from "react";
import { WeightsContext } from "@/lib/WeightsContext";

export default function Result() {
    const { user } = useContext(UserContext);
    const { isLoading } = useContext(WeightsContext);

    return (
        <div className={styles.weight_chart_result}>
            {!isLoading ? <>
                <span>Сброшено: {Math.round((user?.user_metadata?.initial_weight - user?.user_metadata?.current_weight) * 100)  / 100} кг</span>
                <span>Осталось: {Math.round((user?.user_metadata?.current_weight - user?.user_metadata?.target_weight) * 100)  / 100}</span>
            </> :
                <div className={styles.weight_chart_result_load}></div>}
            
        </div>
    );
}