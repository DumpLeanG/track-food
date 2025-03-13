"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Search.module.scss";
import Image from "next/image";
import Item from "./Item";

// Вспомогательная функция debounce
function debounce (func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export default function Search() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);

    // Функция для выполнения запроса
    const fetchFoodData = async (query) => {
        setLoading(true);
        setError(null);

        try {
            // Получаем токен
            const tokenResponse = await fetch('/api/get-token', {
                method: 'POST',
            });
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            // Ищем еду
            const foodResponse = await fetch('/api/search-food', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken, query }),
            });
            const foodData = await foodResponse.json();
            console.log(foodData);

            // Проверяем, что foodData.foods.food существует
            if (foodData.foods_search && foodData.foods_search.results && foodData.foods_search.results.food) {
                setItems(foodData.foods_search.results.food);
            } else {
                setItems([]); // Если данных нет, устанавливаем пустой массив
            }
        } catch (error) {
            setError(error);
            setItems([]); // В случае ошибки очищаем список
        } finally {
            setLoading(false);
        }
    };

    // Debounce-версия функции fetchFoodData
    const debouncedFetchFoodData = useCallback(debounce(fetchFoodData, 500), []);

    useEffect(() => {
        // Выполняем запрос только если query не пустой
        if (query) {
            debouncedFetchFoodData(query);
        } else {
            setItems([]); // Если query пустой, очищаем список
        }
    }, [query, debouncedFetchFoodData]);


    return (
        <div className={styles.adding_block_search}>
            <div className={styles.adding_block_search_input}>
                <input
                    type="text"
                    placeholder="Введите название"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Image src="/search.svg" width={22} height={22} alt="search-icon" />
            </div>
            <ul className={styles.adding_block_list}>
                {loading ? (
                    <div className={styles.adding_block_list_container}>
                        <div className={styles.adding_block_list_container_load}></div>
                    </div>
                ) : error ? (
                    <div className={styles.adding_block_list_txt}>Error: {error.message}</div>
                ) : items.length > 0 ? (
                    items.map((item) => (
                        <Item key={item.food_id} item={item} className={styles.adding_block_list_item} type="add" />
                    ))
                ) : query ? (
                    <div className={styles.adding_block_list_txt}>No results found</div> // Сообщение, если нет результатов
                ) : null}
            </ul>
        </div>
    );
}