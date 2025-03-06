"use client";

import Image from "next/image";
import AddButton from "@/components/buttons/AddButton";
import { setOpenedContext, setFoodContext } from "@/lib/foodContext";
import { useContext } from "react";

export default function Item( {item, className, type } ) {
    const setOpened = useContext(setOpenedContext);
    const setFood = useContext(setFoodContext);

    function handleClick() {
        setOpened("parameters");
        setFood(item);
    }

    return (
        <li className={className}>
            <span>{item.name}</span>
            {(type === "searched") ? <Image src="/searched.svg" alt="searched-icon" width={18} height={18}/> : <AddButton handleClick={handleClick}/>}
        </li>
    );
}