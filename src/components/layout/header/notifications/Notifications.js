"use client";

import styles from "./Notifications.module.scss";
import { useContext, useState, useEffect } from 'react';
import Item from "./Item";
import { UserContext } from "@/lib/UserContext";
import { supabase } from "@/lib/supabaseClient";

export default function Notifications() {
    const [activeItem, setActiveItem] = useState("Messages");
    const [messages, setMessages] = useState([]);
    const [news, setNews] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);
    const { user } = useContext(UserContext);

    async function fetchMessages(user) {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('user_id', user.id);
    
        if (error) {
            console.error('Ошибка при загрузке данных:', error);
        }

        return data;
    }
        
    useEffect(() => {
        if(user && activeItem === "Messages" && messages.length === 0) {
            async function fetchData() {
                setMessagesLoading(true);
                const result = await fetchMessages(user);
                setMessages(result);
                setMessagesLoading(false);
            }
            
            fetchData();
        }
    }, [user, activeItem]);

    async function fetchNews() {
        const { data, error } = await supabase
            .from('news')
            .select('*');
    
        if (error) {
            console.error('Ошибка при загрузке данных:', error);
        }

        return data;
    }

    useEffect(() => {
        if(activeItem === "News" && news.length === 0) {
            async function fetchData() {
                setNewsLoading(true);
                const result = await fetchNews();
                setNews(result);
                setNewsLoading(false);
            }
            
            fetchData();
        }
    }, [activeItem]);

    return (
        <div className={styles.notifications}>
            <div className={styles.notifications_head}>
                <span className={`${styles.notifications_head_item} ${(activeItem) === "Messages" && styles.active_item}`} onClick={() => setActiveItem("Messages")}>Входящие</span>
                <span className={`${styles.notifications_head_item} ${(activeItem) === "News" && styles.active_item}`} onClick={() => setActiveItem("News")}>Что нового</span>
            </div>
            <ul className={styles.notifications_list}>
                {(activeItem === "Messages") 
                    ? ((messagesLoading) ? <span className={styles.notifications_list_loading}>Загрузка...</span> : ((messages.length !== 0) ? messages.map((notification) => 
                        <Item key={notification.id} title={notification.title} text={notification.content} date={notification.created_at}/>
                    ) : <span className={styles.notifications_list_empty}>Ваши входящие пусты</span>))
                    : ((newsLoading) ? <span className={styles.notifications_list_loading}>Загрузка...</span> : ((news.length !== 0) ? news.map((notification) => 
                        <Item key={notification.id} title={notification.title} text={notification.content} date={notification.created_at}/>
                    ) : <span className={styles.notifications_list_empty}>Ничего нового</span>))
                }
            </ul>
        </div>
    )
}