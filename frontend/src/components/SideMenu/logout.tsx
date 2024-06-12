"use client"

import { logout } from "@/api/lougout";
import { LogOut } from "lucide-react";

export default function Logout() {

    return (
        <button className="flex px-5 w-[100%] gap-4"
            onClick={() => logout()}
        >
            <LogOut className="-rotate-180" />
            Sair da conta
        </button>
    )
}
