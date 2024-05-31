import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button {...props} className="rounded-lg p-2 my-1 bg-blue-700 font-bold hover:bg-blue-800 shadow-2xl text-slate-50"></button>
    )
}