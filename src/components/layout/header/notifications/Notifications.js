"use client";

import styles from "./Notifications.module.scss";
import { useState } from 'react';
import Item from "./Item";

const inbox = [
    {id: 0, title: "Вы почти у цели!", text: "До желаемого веса осталось скинуть 1,4 кг.",},
    {id: 1, title: "Вы почти у цели!", text: "До желаемого веса осталось скинуть 1,4 кг.",},
    {id: 2, title: "Вы почти у цели!", text: "До желаемого веса осталось скинуть 1,4 кг.",},
]

const news = [
    {id: 0, title: "Теперь вы можете изменить имя пользователя!", text: "Вы просили, мы прислушались. Теперь мы разрешаем всем пользователям легко изменить имя в любой момент времени.",},
    {id: 1, title: "Теперь вы можете изменить имя пользователя!", text: "Вы просили, мы прислушались. Теперь мы разрешаем всем пользователям легко изменить имя в любой момент времени.",},
    {id: 2, title: "Теперь вы можете изменить имя пользователя!", text: "Вы просили, мы прислушались. Теперь мы разрешаем всем пользователям легко изменить имя в любой момент времени.",},
]

export default function Notifications() {
    const [activeItem, setActiveItem] = useState("Inbox");

    return (
        <div className={styles.notifications}>
            <div className={styles.notifications_head}>
                <span className={`${styles.notifications_head_item} ${(activeItem) === "Inbox" && styles.active_item}`} onClick={() => setActiveItem("Inbox")}>Входящие</span>
                <span className={`${styles.notifications_head_item} ${(activeItem) === "News" && styles.active_item}`} onClick={() => setActiveItem("News")}>Что нового</span>
            </div>
            <ul className={styles.notifications_list}>
                {(activeItem === "Inbox") 
                    ? ((inbox.length !== 0)? inbox.map((notification) => 
                        <Item key={notification.id} title={notification.title} text={notification.text}/>
                    ): <span className={styles.notifications_list_empty}>Ваши входящие пусты</span>)
                    : ((news.length !== 0)? news.map((notification) => 
                        <Item key={notification.id} title={notification.title} text={notification.text}/>
                    ): <span className={styles.notifications_list_empty}>Ничего нового</span>)
                }
            </ul>
        </div>
    )
}