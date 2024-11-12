"use client"

import { EventosProps } from "@/@types/EventosProps";
import { createEvent, updateEvent } from "@/api/eventoApi";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDataIsoBr } from "@/functions/formatDataIsoBr";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, SquareX } from "lucide-react";
import { register } from "module";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


const schema = z.object({
    descricao: z.string().min(3, "Insira a descrição"),
    data: z.string().min(8, "Insira a data"),
});

type FormProps = z.infer<typeof schema>;
type EventFormProps = {
    evento?: EventosProps,
    edit?: boolean,
}
export default function EventForm(props: EventFormProps) {
    const [openMoldal, setOpenMoldal] = useState(false);
    const evento = props.evento;
    let eventoData = "";

    if (evento) {
        const dataBR = formatDataIsoBr(evento!.data);
        eventoData = dataBR;
    }


    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormProps>({
        // defaultValues: {
        //     descricao: evento?.descricao ?? "",
        //     data: evento?.data ?? "",
        // },
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if (evento?.id) {
            setValue("descricao", evento.descricao);
            setValue("data", eventoData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleRegister = async (data: FormProps) => {
        if (!evento?.id) {
            const result = await createEvent(data);

            setOpenMoldal(!openMoldal);
            reset();
            toast.success(result?.message);
            return;
        }
        if (evento?.id) {
            const res = await updateEvent(data, evento.id);
            if (!res?.error) {
                setOpenMoldal(!openMoldal);
                reset();
                toast.success(res?.message);
                return;
            }
            toast.error(res?.message);
        }
    }

    return (
        <Dialog open={openMoldal}>
            <DialogTrigger asChild className="text-COLORS-TEXT_WHITE">
                <>
                    {!props.edit &&
                        <Button type="button" onClick={() => setOpenMoldal(!openMoldal)} variant={"secondary"} className="w-auto">
                            Adicionar Evento
                        </Button>
                    }
                    <button type="button" onClick={() => setOpenMoldal(!openMoldal)}>
                        {props.edit && <Edit className="text-green-600" />}
                    </button>
                </>
            </DialogTrigger>
            <DialogContent className={`bg-COLORS-BACKGROUND_UI text-COLORS-TEXT_WHITE p-4 border-COLORS-TEXT_WHITE`}>
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle>
                            {!props.edit && "Adicionar Evento"}
                            {props.edit && "Editar Evento"}
                        </DialogTitle>
                        <DialogClose asChild><button type="button" onClick={() => setOpenMoldal(!openMoldal)}><SquareX size={30} /></button></DialogClose>
                    </div>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <main className="rounded-sm text-COLORS-TEXT_WHITE">
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                            <Input {...register("descricao")} label="Descrição" helperText={errors.descricao?.message} />
                            <Input {...register("data")} label="Data" datatype="dd/mm/yyyy" helperText={errors.data?.message} />
                        </div>
                        <div className=" mt-7 flex justify-end text-xl space-x-1">
                            <Button disabled={isSubmitting} variant={"secondary"}>{isSubmitting ? "Salvando..." : "Salvar"}</Button>
                        </div>
                    </form>
                </main >
            </DialogContent>
        </Dialog>
    );
}

