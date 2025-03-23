import styles from "./Form.module.scss";
import Inputs from "./Inputs";
import Button from "@/components/layout/buttons/Button";

export default function Form() {
    return (
        <form className={styles.weight_form} action="">
            <Inputs />
            <Button type="save" text="Сохранить" />
        </form>
    );
}