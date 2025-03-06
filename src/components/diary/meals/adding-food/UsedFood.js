"use client";

import { useState } from "react";
import styles from "./UsedFood.module.scss";
import Item from "./Item";

let items = [];

export default function UsedFood( {type} ) {
    {(type === "recent")
        ? items = [
            {name: "Индилайт Кампана Ветчина из Грудки Индейки"},
            {name: "Оладьи"},
            {name: "Рис вареный"},
            {name: "Кофе"},
            {name: "Банан"},
            {name: "Огурец"},
            {name: "Томаты"},
        ] 
        : items = [
            {name: "Индилайт Кампана Ветчина из Грудки Индейки"},
            {name: "Оладьи"},
            {name: "Рис вареный"},
            {name: "Кофе"},
            {name: "Банан"},
            {name: "Томаты"},
            {name: "Огурец"},
    ]}

    return (
        <div className={styles.adding_block_used}>
            <ul className={styles.adding_block_list}>
                {items.map(item => 
                    <Item key={item.name} item={item} className={styles.adding_block_list_item} type="add"/>
                )}
            </ul>
        </div>
    );
}