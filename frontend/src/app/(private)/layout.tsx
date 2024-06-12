import SideMenu from "@/components/SideMenu";

export default function PrivateLayout({ children }: { children: React.ReactElement }) {
    return (
        <main className="flex">
            <SideMenu />
            {children}
        </main>
    )
}
