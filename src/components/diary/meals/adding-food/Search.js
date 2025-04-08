"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./Search.module.scss";
import Image from "next/image";
import Item from "./Item";

function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export default function Search() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const fetchFoodData = async (query, page) => {
        setLoading(true);
        setError(null);

        try {
            const tokenResponse = await fetch('/api/get-token', {
                method: 'POST',
            });
            if (!tokenResponse.ok) {
                throw new Error('Failed to fetch access token');
            }
            const tokenData = await tokenResponse.json();
            const accessToken = tokenData.access_token;

            const foodResponse = await fetch('/api/search-food', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accessToken, query, page }),
            });
            if (!foodResponse.ok) {
                throw new Error('Failed to fetch food data');
            }
            const foodData = await foodResponse.json();

            if (foodData.foods_search && foodData.foods_search.results && foodData.foods_search.results.food) {
                const newItems = foodData.foods_search.results.food;
                setItems((prevItems) => (page === 0 ? newItems : [...prevItems, ...newItems]));
                setHasMore(newItems.length > 0);
            } else {
                setItems([]);
                setHasMore(false);
            }
        } catch (error) {
            setError(error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchFoodData = useCallback(debounce(fetchFoodData, 500), []);

    useEffect(() => {
        if (query) {
            debouncedFetchFoodData(query, page);
        } else {
            setItems([]);
        }
    }, [query, page, debouncedFetchFoodData]);

    useEffect(() => {
        if (loading || !hasMore) return;

        const observerCallback = (entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        observer.current = new IntersectionObserver(observerCallback, options);

        if (observer.current) {
            observer.current.observe(document.querySelector("#load-more-trigger"));
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading, hasMore]);

    return (
        <div className={styles.adding_block_search}>
            <div className={styles.adding_block_search_input}>
                <input
                    type="text"
                    placeholder="Введите название"
                    defaultValue={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setPage(0);
                    }}
                    name="search"
                />
                <Image src="/search.svg" width={22} height={22} alt="search-icon" />
            </div>
            <ul className={styles.adding_block_list}>
                {loading && page === 0 ? (
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
                    <div className={styles.adding_block_list_txt}>Нет результатов</div>
                ) : null}

                {hasMore && !loading && (
                    <div id="load-more-trigger"></div>
                )}

                {loading && page > 0 && (
                    <div className={styles.adding_block_list_container}>
                        <div className={styles.adding_block_list_container_load}></div>
                    </div>
                )}

                {!hasMore && items.length > 0 && (
                    <div className={styles.adding_block_list_txt}>Вы достигли конца списка.</div>
                )}
            </ul>
        </div>
    );
}