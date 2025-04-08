"use client";

import Image from "next/image";
import AddButton from "@/components/layout/buttons/AddButton";
import { FoodContext } from "@/lib/FoodContext";
import { useContext } from "react";

export default function Item( {item, className, type } ) {
    const {setFood, setOpened } = useContext(FoodContext);

    function handleClick() {
        setOpened("parameters");
        setFood(item);
    }

    return (
        <li className={className}>
            <span>{item.food_name || item.name} {(item.food_type === 'Brand' && `(${item.brand_name})`)}</span>
            {(type === "searched") ? <Image src="/searched.svg" alt="searched-icon" width={18} height={18}/> : <AddButton handleClick={handleClick}/>}
        </li>
    );
}