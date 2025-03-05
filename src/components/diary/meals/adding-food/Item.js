"use client";

import Image from "next/image";
import AddButton from "@/components/buttons/AddButton";

export default function Item( {name, className, type} ) {
    return (
        <li className={className}>
            <span>{name}</span>
            {(type === "searched") ? <Image src="/searched.svg" alt="searched-icon" width={18} height={18}/> : <AddButton />}
        </li>
    );
}