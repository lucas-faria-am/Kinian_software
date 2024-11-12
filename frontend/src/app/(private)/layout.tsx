import SideMenu from "@/components/SideMenu";
import { Toaster } from "react-hot-toast";

export default function PrivateLayout({ children }: { children: React.ReactElement }) {
    return (
        <main className="flex">
            <SideMenu />
            {children}
        </main>
    )
}
