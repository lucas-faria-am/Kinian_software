export default function Container({ children }: { children: React.ReactElement }) {
    return (
        <main className="h-screen w-screen bg-[#1a2735]">
            {children}
        </main>
    )
}