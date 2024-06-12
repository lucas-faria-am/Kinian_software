import { BadgeDollarSign, CalendarDays, HandCoins, LayoutDashboard, LogOut, Users } from "lucide-react"
import MenuItem from "./menuItem"
import { logout } from "@/api/lougout"
import Logout from "./logout"

export default async function SideMenu() {
    // const { user }  = await auth();

    const handleLogout = async () => {
        "use server"
        // signOut();
    }
    const menuItems = [
        {
            title: "Dashboard",
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
        <main className={`flexh-screen w-1/4 bg-COLORS-BACKGROUND_UI text-COLORS-TEXT_WHITE px-4`}>
            <div className="flex items-center gap-5 mb-5 p-5">
                <div className="flex flex-col">
                    <span className="font-medium">Lucas</span>
                    <span className="text-xs">Administrador</span>
                </div>
            </div>
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
        </main >

    )
}
