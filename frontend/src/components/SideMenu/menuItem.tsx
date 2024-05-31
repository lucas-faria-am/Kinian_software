"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"


export default function MenuItem({ item }: { item: { title: string, path: string, icon: React.ReactElement } }) {
    const pathname = usePathname();
    return (
        <Link href={item.path!}
            className={`flex p-5 items-center gap-[10px] ${pathname === item.path && "bg-[#5d6679]/40"} rounded-xl`}
        >
            {item.icon}
            {item.title}
        </Link>
    )
}
