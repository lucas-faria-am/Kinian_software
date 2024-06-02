import { UserProps } from "@/@types/UserProps";
import { deleteUser, getAll } from "@/api/useUserApi";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { FilePenLine, Trash2 } from "lucide-react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { COLORS } from "@/constants/colors";


export default async function Usuarios() {
    const users: UserProps[] = await getAll();

    return (
        <Container>
            <div className={`flex h-screen w-full items-center flex-col text-COLORS-TEXT_WHITE`}>
                <div className="flex flex-col items-center bg-[#23304F] w-[95%] p-4 rounded-lg shadow-2xl gap-2 mt-24">
                    <Toaster />
                    <h1 className="font-semibold text-lg">Usuario cadastrados</h1>
                    <div className="flex w-full justify-end pb-1 ">
                        <Link
                            className={`rounded-lg p-2 my-1 bg-COLORS-BTN_DEFAULT font-bold
                            hover:bg-opacity-80 shadow-2xl `}
                            href={"usuario/cadastrar/"}>Casdastrar novo usuário
                        </Link>
                    </div>
                    <table
                        className="w-full rounded-md"
                    >
                        <thead>
                            <tr className="  size-10">
                                <th>#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th colSpan={2}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="text-center size-12"
                                >
                                    <td>{user.id}</td>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.celular}</td>
                                    <td >
                                        <div className="flex justify-center p-1">
                                            <Link href={`usuario/alterar/${user.id}`}
                                                className="bg-green-600 w-20 flex justify-center  p-0.5 rounded-md"
                                            >
                                                <FilePenLine size={25} className="mr-1" />
                                                Editar
                                                {/* <i className="bi bi-pencil-square text-xl"></i> */}
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <form action={deleteUser} className="flex justify-center p-1">
                                            <input type="hidden" name="id" value={user.id} />
                                            <button
                                                className="flex w-20 justify-center bg-red-900 rounded-md p-0.5"
                                            >
                                                <Trash2 size={25} className="mr-1" />
                                                Excluir

                                                {/* <i className="bi bi-trash3"></i> */}
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )
}