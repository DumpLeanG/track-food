import styles from "./Button.module.scss";

export default function Button( {type, onClick} ) {


    switch(type) {
        
        case "delete":
            return (
                <button type="submit" className={`${styles.button} ${styles.red_btn}`} onClick={onClick}>Удалить</button>
            )
        case "save":
            return (
                <button type="submit" className={styles.button} onClick={onClick}>Сохранить</button>
            )
        case "more":
            return (
                <button type="submit" className={styles.button} onClick={onClick}>Посмотреть ещё</button>
            )
        case "login":
            return (
                <button type="submit" className={styles.button} onClick={onClick}>Войти</button>
            )
        case "register":
            return (
                <button type="submit" className={styles.button} onClick={onClick}>Зарегистрироваться</button>
            )
        case "exit":
            return (
                <button type="submit" className={`${styles.button} ${styles.red_btn}`} onClick={onClick}>Выйти</button>
            )
        case "cancel":
        return (
            <button type="button" className={`${styles.button} ${styles.red_btn}`} onClick={onClick}>Отменить</button>
        )
        default:
            return (
                <button type="submit" className={styles.button} onClick={onClick}>Изменить</button>
            )
    }
    
}