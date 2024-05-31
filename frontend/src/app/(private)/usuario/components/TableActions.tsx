"use client"
import { UserProps } from '@/@types/UserProps';
import { deleteUser } from '@/api/useUserApi';
import { useQueryUsers } from '@/lib/reactQuery/queryAndMutations/useQueryUsers';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React from 'react'

type ButtonProps = {
    id: string;
}
export default function TableActions(props: ButtonProps) {
    // const { deleteUser } = useUserApi();
    // const { getUsers, deleteUsers } = useQueryUsers();
    // const deleteUser = deleteUsers().mutate;
    const router = useRouter();

    const handleEditar = (id: string) => {
        router.push(`usuario/alterar/${id}`);

    }
    const handleExcluir = async (id: string) => {
        deleteUser(id);
    }

    return (
        <>
            <td>
                <button
                    onClick={() => handleEditar(props.id!)}
                    className="rounded-full"
                >
                    <i className="bi bi-pencil-square text-xl"></i>
                </button>
            </td>
            <td>
                <button
                    onClick={() => handleExcluir(props.id!)}
                    className="rounded-full text-xl"
                >
                    <i className="bi bi-trash3"></i>
                </button>
            </td>
        </>
    )
}
