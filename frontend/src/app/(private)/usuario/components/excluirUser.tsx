"use client"
import { UserProps } from '@/@types/UserProps'
import { deleteUser, getProfile } from '@/api/UserApi'
import { Trash2 } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

type Props = {
    user: UserProps
}

export default function ExcluirUser(props: Props) {
    const handleToast = async () => {

        const data = await getProfile();

        if (data.user.id == props.user.id) {
            return toast.error("Você não pode deletar sua própria conta!", {
                id: "deleteError"
            });
        }

        toast(
            (t) => (
                <div className="flex justify-center flex-col text-COLORS-TEXT_WHITE gap-2">
                    <div className="font-semibold">
                        <p>Deseja excluir esse o usuario </p>
                        <p>{props.user.nome} com id {props.user.id}?</p>
                        <p className="mt-3 text-red-700">Essa ação não pode ser desfeita</p>
                    </div>
                    <div className="flex gap-1 justify-between">
                        <button className='bg-red-900 rounded-xl p-2' onClick={async () => {
                            const res = await deleteUser(props.user.id!);

                            toast.success(res.message, {
                                id: t.id,
                                style: {
                                    backgroundColor: "#ffffff"
                                },
                                duration: 3000
                            });
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
                id: "ToastDelete",
                duration: 30000
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
