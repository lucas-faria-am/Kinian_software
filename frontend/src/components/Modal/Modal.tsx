import {
    Dialog,
    DialogContent,
    DialogHeader,
} from "@/components/ui/dialog"
import { Button } from "../Button"
import { useContext } from "react"
import { ModalContext } from "./modal-context"

export function Modal({ children }: { children: React.ReactElement }) {
    const { show, setShow } = useContext(ModalContext);

    return (
        <Dialog open={show} onOpenChange={setShow}>
            <DialogContent>
                <DialogHeader onClick={() => setShow(false)}></DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}