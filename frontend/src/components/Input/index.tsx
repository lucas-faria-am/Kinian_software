import { InputHTMLAttributes, forwardRef, useId } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    helperText?: any;
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
                        className={`flex h-10 w-full  bg-transparent border-b-2 border-COLORS-TEXT_WHITE  ${hasError && "border-red-600"}`}
                        id={inputId}
                        type={type}
                        name={name}
                        ref={ref}
                        {...props}
                    />
                    {hasError && <p className="text-COLORS-ERROR_TEXT m-2">{helperText}</p>}
                </div>
            </>
        )
    })
