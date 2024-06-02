import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
    return (
        <button {...props} className="rounded-lg p-2 my-1 bg-COLORS-BTN_DEFAULT font-bold hover:bg-opacity-80 shadow-2xl text-slate-50"></button>
    )
}