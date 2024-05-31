export default function Container({ children }: { children: React.ReactElement }) {
    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-[#1a2735]">
            {children}
        </main>
    )
}