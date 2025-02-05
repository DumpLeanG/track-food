import styles from "./Button.module.scss";

export default function Button( {type} ) {


    switch(type) {
        
        case "delete":
            return (
                <button className={`${styles.button} ${styles.delete_btn}`}>Удалить</button>
            )
        case "save":
            return (
                <button className={styles.button}>Сохранить</button>
            )
        case "more":
            return (
                <button className={styles.button}>Посмотреть ещё</button>
            )
        case "login":
            return (
                <button className={styles.button}>Войти</button>
            )
        case "register":
            return (
                <button className={styles.button}>Зарегистрироваться</button>
            )
        default:
            return (
                <button className={styles.button}>Изменить</button>
            )
    }
    
}