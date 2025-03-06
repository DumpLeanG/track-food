"use client";

import { useState } from "react";
import styles from "./Search.module.scss";
import Image from "next/image";
import Item from "./Item";

const items = [
    {name: "Индилайт Кампана Ветчина из Грудки Индейки"},
    {name: "Оладьи"},
    {name: "Рис вареный"},
    {name: "Кофе"},
    {name: "Банан"},
    {name: "Огурец"},
    {name: "Томаты"},
]

export default function Search() {
    const [searchText, setSearchText] = useState("");

    return (
        <div className={styles.adding_block_search}>
            <div className={styles.adding_block_search_input}>
                <input
                    type="text"
                    placeholder="Введите название"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Image src="/search.svg" width={22} height={22} alt="search-icon"/>
            </div>
            <ul className={styles.adding_block_list}>
                {items.map(item => 
                    <Item key={item.name} item={item} className={styles.adding_block_list_item} type="searched"/>
                )}
            </ul>
        </div>
    );
}