import { useContext } from "react";
import styles from "./Form.module.scss";
import Inputs from "./Inputs";
import Button from "@/components/layout/buttons/Button";
import { supabase } from "@/lib/supabaseClient";
import { UserContext } from "@/lib/UserContext";
import { WeightsContext } from "@/lib/WeightsContext";

export default function Form() {
    const { user } = useContext(UserContext);
    const { fetchWeights, setWeights } = useContext(WeightsContext);
    const handleChange = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.updateUser({
            data: {
                initial_weight: parseFloat(e.target.initial_weight.value.split(' ')[0]),
                current_weight: parseFloat(e.target.current_weight.value.split(' ')[0]),
                target_weight: parseFloat(e.target.target_weight.value.split(' ')[0]),
            },
        });
        
        let zeroError = "";

        if(parseFloat(e.target.initial_weight.value.split(' ')[0] === 0) || parseFloat(e.target.current_weight.value.split(' ')[0]) === 0 || parseFloat(e.target.target_weight.value.split(' ')[0]) === 0) {
            zeroError = "Нельзя сохранить нулевой вес";
        }
        
        if (error || zeroError) {
            console.error("Ошибка при сохранении изменений:", error || zeroError);
        } else {
            console.log('Вес успешно сохранен!');
            const result = await fetchWeights(user);
            setWeights(result);
            return data;
        }
    };

    return (
        <form className={styles.weight_form} onSubmit={handleChange}>
            <Inputs />
            <Button type="save" text="Сохранить" />
        </form>
    );
}