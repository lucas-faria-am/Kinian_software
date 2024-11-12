import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { SquareX } from "lucide-react";

type ModalProps = { children: React.ReactElement } & {
    title: string;
    description?: string;
    open: boolean;
}

export function Modal(props: ModalProps) {

    return (
        <Dialog defaultOpen={props.open}>
            <DialogTrigger asChild className="text-COLORS-TEXT_WHITE">
                <Button type="button" variant={"secondary"} >Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className={`bg-COLORS-BACKGROUND_UI text-COLORS-TEXT_WHITE p-4 border-COLORS-TEXT_WHITE`}>
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle>{props.title}</DialogTitle>
                        <DialogClose asChild><button type="button"><SquareX size={30} /></button></DialogClose>
                    </div>
                    <DialogDescription>
                        {props.description}
                    </DialogDescription>
                </DialogHeader>
                {props.children}
            </DialogContent>
        </Dialog>
    )
}
