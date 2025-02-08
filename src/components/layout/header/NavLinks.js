'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { name: 'Diary', href: '/', text: 'Дневник' },
    { name: 'Weight', href: '/weight', text: 'Мой вес' },
    { name: 'Reports', href: '/reports', text: 'Отчеты' },
  ];
  

export default function NavLinks( { className, selectedLink }) {
    const pathname = usePathname();

    return (
        <ul className={className}>
            {links.map(link => {
                return (
                    <li key={link.name}>
                        {pathname === link.href ?
                        <Link href={link.href} className={selectedLink}>{link.text}</Link>
                        : <Link href={link.href}>{link.text}</Link>
                        }  
                    </li>
                );
            })}
        </ul>
    );
}