import { BadgeDollarSign, CalendarDays, HandCoins, LayoutDashboard, LogOut, Users } from "lucide-react"
import MenuItem from "./menuItem"
import { logout } from "@/api/lougout"
import Logout from "./logout"
import { getProfile } from "@/api/UserApi"
import { UserProps } from "@/@types/UserProps"

export default async function SideMenu() {
    const data = await getProfile();
    const user = data.user as UserProps;

    const menuItems = [
        {
            title: "Visão geral",
            path: "/dashboard",
            icon: <LayoutDashboard />
        },
        {
            title: "Gestão usuários",
            path: "/usuario",
            icon: <Users />
        },
        {
            title: "Finanças",
            path: "/financas",
            icon: <BadgeDollarSign />
        },
        {
            title: "Eventos",
            path: "/eventos",
            icon: <CalendarDays />
        },
        {
            title: "Dizímos e Ofertas",
            path: "/dizimoOferta",
            icon: <HandCoins />
        }
    ]
    return (
        <main className={`flex flex-col h-screen w-1/4 bg-COLORS-BACKGROUND_UI text-COLORS-TEXT_WHITE`}>
            <div className="flex items-center px-9 py-3">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-[23px]">{user.nome}</span>
                    <span className="text-sm">{user.email}</span>
                </div>
            </div>
            <div className="border-t-4 border-slate-600 mb-2"></div>
            <div className="px-4">
                <ul>
                    {menuItems.map(item => (
                        <li key={item.title}>
                            <MenuItem item={item} />
                        </li>
                    ))
                    }
                </ul>
                <div className="flex items-center absolute w-[18%] py-6 bottom-2 hover:bg-[#5d6679]/40 rounded-xl">
                    <Logout />
                </div>
            </div>
        </main>

    )
}
