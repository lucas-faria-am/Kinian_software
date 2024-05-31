"use client"

import { ModalContext } from "./modal-context"
import { useState } from "react"

export function ModalProvider({ children }: { children: React.ReactElement }) {
    const [show, setShow] = useState(false);
    return (
        <ModalContext.Provider value={{ show, setShow }}>
            {children}
        </ModalContext.Provider>
    )
}