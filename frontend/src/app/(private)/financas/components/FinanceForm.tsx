"use client"

import { UserProps } from "@/@types/UserProps";
import { createDespesa } from "@/api/despesaApi";
import { createReceita } from "@/api/receitaApi";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


const schema = z.object({
    descricao: z.string().min(3, "Insira a descrição"),
    valor: z.string().min(3, "Insira um valor"),
    data: z.string().min(8, "Insira a data"),
});

type FormProps = z.infer<typeof schema>;
export type ReceitaFormProps = {
    receita?: {
        id?: string,
        descricao: string,
        valor: string,
        data: string,
    }
    tipo: string,
}
export default function FinanceForm({ receita, tipo }: ReceitaFormProps) {
    const router = useRouter();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormProps>({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(schema)
    });

    const handleBack = () => {
        router.push("/financas/")
    }

    const handleRegister = async (data: FormProps) => {
        if (tipo === "receita") {
            const res = await createReceita(data);

            if (!res?.success) {
                toast.error(res?.message!);

            } else {
                toast.success(res?.message);
                reset();
                router.push("/financas/");
            }
        }
        if (tipo === "despesa") {
            const res = await createDespesa(data);
            reset

            if (!res?.success) {
                toast.error(res?.message!);

            } else {
                toast.success(res?.message);
                reset();
                router.push("/financas/");
            }
        }


    }

    return (
        <main className="bg-COLORS-BACKGROUND_UI rounded-sm p-4 w-4/5 text-COLORS-TEXT_WHITE">
            <form onSubmit={handleSubmit(handleRegister)}>
                <div className=" my-1 p-4 font-medium">
                    {tipo === "receita" &&
                        <h1 className="flex justify-center text-xl">Adicionar receita</h1>
                    }
                    {tipo === "despesa" &&
                        <h1 className="flex justify-center text-xl">Adicionar despesa</h1>
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <Input {...register("descricao")} label="Descrição" helperText={errors.descricao?.message} />
                    <Input {...register("valor")} label="Valor" helperText={errors.valor?.message} />
                    <Input {...register("data")} label="Data" datatype="dd/mm/yyyy" helperText={errors.data?.message} />
                </div>
                <div className=" mt-4 flex justify-end text-xl space-x-1">
                    <Button disabled={isSubmitting}>{isSubmitting ? "Salvando" : "Salvar"}</Button>
                    <Button type="button" onClick={handleBack}>Voltar</Button>
                </div>
            </form>
        </main >
    );
}

