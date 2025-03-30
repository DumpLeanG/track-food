import styles from "./Inputs.module.scss";
import NumberInput from "@/components/layout/inputs/NumberInput";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/UserContext";


export default function Inputs() {
    const { user } = useContext(UserContext);
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        if (user) {
            setInputs([
                {   label: "Начальный вес",
                    name: "initial_weight",
                    defaultValue: user?.user_metadata?.initial_weight || 0,
                    onChange: (e) => {setInputs((i) => [
                        {...i[0], defaultValue: e.target.value},
                        {...i[1],},
                        {...i[2],}
                    ])},
                },
                {   label: "Текущий вес",
                    name: "current_weight",
                    defaultValue: user?.user_metadata?.current_weight || 0,
                    onChange: (e) => {setInputs((i) => [
                        {...i[0],},
                        {...i[1], defaultValue: e.target.value},
                        {...i[2],}
                    ])},
                },
                {   label: "Желаемый вес",
                    name: "target_weight",
                    defaultValue: user?.user_metadata?.target_weight || 0,
                    onChange: (e) => {setInputs((i) => [
                        {...i[0],},
                        {...i[1],},
                        {...i[2], defaultValue: e.target.value}
                    ])},
                },
            ]);
        }
    }, [user]);

    return (
        <div className={styles.weight_form_inputs}>
            {user && inputs.map(input => (
                <div key={input.name} className={styles.weight_form_inputs_item}>
                    <label>
                        {input.label}
                    </label>
                    <NumberInput defaultValue={input.defaultValue} onChange={input.onChange} name={input.name} hasOwnOnChange={true} measurement="кг" step="0.1" max="300"/>
                </div>
            ))}
        </div>
    );
}