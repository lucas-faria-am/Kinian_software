"use client"
import { FinanceProps } from '@/@types/FinanceProps'
import { UserProps } from '@/@types/UserProps'
import { deleteDespesa } from '@/api/despesaApi'
import { deleteReceita } from '@/api/receitaApi'
import { deleteUser, getProfile } from '@/api/UserApi'
import { Trash2 } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'


export default function TableExcluir(props: FinanceProps & { tipo: string }) {
    const handleToast = async () => {

        toast(
            (t) => (
                <div className="flex justify-center flex-col text-COLORS-TEXT_WHITE gap-2">
                    {props.tipo === "receita" &&
                        <div className="font-semibold">
                            <p>Deseja excluir a receita </p>
                            <p>{props.descricao} com id {props.id}?</p>
                            <p className="mt-3 text-red-700">Essa ação não pode ser desfeita</p>
                        </div>

                    }
                    {props.tipo === "despesa" &&
                        <div className="font-semibold">
                            <p>Deseja excluir a despesa </p>
                            <p>{props.descricao} com id {props.id}?</p>
                            <p className="mt-3 text-red-700">Essa ação não pode ser desfeita</p>
                        </div>

                    }
                    <div className="flex gap-1 justify-between">
                        <button className='bg-red-900 rounded-xl p-2' onClick={async () => {
                            if (props.tipo === "receita") {
                                const res = await deleteReceita(props.id!);

                                toast.success(res.message, {
                                    id: t.id,
                                    style: {
                                        backgroundColor: "#ffffff"
                                    },
                                    duration: 3000
                                });
                            } else if (props.tipo === "despesa") {
                                const res = await deleteDespesa(props.id!);

                                toast.success(res.message, {
                                    id: t.id,
                                    style: {
                                        backgroundColor: "#ffffff"
                                    },
                                    duration: 3000
                                });
                            }
                        }
                        }> Confirmar</button>
                        <button className='bg-zinc-400 rounded-xl p-2' onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                    </div>
                </div>
            ),
            {
                position: "top-center",
                style: {
                    backgroundColor: "#272727"
                },
                duration: 30000,
            },
        )
    }
    return (
        <main className="flex justify-center p-1 w-full h-full">
            <button
                className="flex w-20 justify-center bg-red-900 rounded-md p-0.5"
                onClick={handleToast}>
                <Trash2 size={25} className="mr-1" />
                Excluir
            </button>
        </main>
    )
}
