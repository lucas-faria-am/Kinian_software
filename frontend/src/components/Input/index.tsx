import { InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ name = '', type = 'text', label = '', helperText = '', ...props }, ref) => {
        const inputId = useId();
        const hasError = helperText.length > 0;

        return (
            <>
                <div className="d-block p2">
                    <label htmlFor={inputId} className="text-lg ">{label}</label>
                    <input
                        className={`flex h-10 w-full  bg-transparent border-b-2 border-black  ${hasError && "border-red-600"}`}
                        id={inputId}
                        type={type}
                        name={name}
                        ref={ref}
                        {...props}
                    />
                    {hasError && <p className="text-red-600 text-xs m-2">{helperText}</p>}
                </div>
            </>
        )
    })
