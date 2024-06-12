"use client"

import { UserProps } from "@/@types/UserProps";
import { create, update } from "@/api/UserApi";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";


const schema = z.object({
    nome: z.string().min(3, "Insira um nome válido"),
    email: z.string().email("Insira um email válido"),
    senha: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
    celular: z.string().min(1, "Insira um celular válido"),
    dataNasc: z.string().min(8, "Insira uma data válido"),
    estado: z.string().min(1, "Insira um estado válido"),
    cidade: z.string().min(1, "Insira uma cidade válido"),
    bairro: z.string().min(1, "Insira um bairro válido"),
    role: z.string().min(3, "Selecione o acesso do usuário")
});

type FormProps = z.infer<typeof schema>;
type CadFormProps = {
    user?: UserProps
}
export default function CadForm({ user }: CadFormProps) {
    const router = useRouter();
    // const { create, update } = useUserApi();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors }
    } = useForm<FormProps>({
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(schema)
    });

    useEffect(() => {
        if (user?.id) {
            setValue("nome", user.nome);
            setValue("email", user.email);
            setValue("celular", user.celular);
            setValue("dataNasc", user.dataNasc);
            setValue("estado", user.estado);
            setValue("cidade", user.cidade);
            setValue("bairro", user.bairro);
            setValue("role", user.role);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleBack = () => {
        router.push("/usuario/")
    }

    const handleRegister = async (data: FormProps) => {
        if (!user?.id) {
            const res = await create(data);
            console.log(user);

            if (!res?.success) {
                console.log(res?.message);

                toast.error(res?.message!);

            } else {
                toast.success(res?.message);
                router.push("/usuario/");
            }
        }
        if (user?.id) {
            const res = await update(data, user.id);
            if (!res?.error) {
                toast.success(res?.message);
                router.push("/usuario/");
                return;
            }
            toast.error(res?.message);
        }
    }

    return (
        <main className="bg-COLORS-BACKGROUND_UI rounded-sm p-4 w-4/5 text-COLORS-TEXT_WHITE">
            <form onSubmit={handleSubmit(handleRegister)}>
                {/* <Toaster containerClassName="flex self-center" /> */}

                <div className=" my-1 p-4">
                    {!user?.id && <h1 className="flex justify-center text-xl">Cadastro de usuário</h1>}
                    {user?.id && <h1 className="flex justify-center text-xl">Alterar usuário</h1>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                    <Input {...register("nome")} label="Nome" helperText={errors.nome?.message} />
                    <Input {...register("email")} label="Email" helperText={errors.email?.message} />
                    <Input {...register("senha")} label="Senha" helperText={errors.senha?.message} />
                    <Input {...register("celular")} label="Celular" helperText={errors.celular?.message} />
                    <Input {...register("dataNasc")} label="Data de nascimento" helperText={errors.dataNasc?.message} />
                    <Input {...register("estado")} label="Estado" helperText={errors.estado?.message} />
                    <Input {...register("cidade")} label="Cidade" helperText={errors.cidade?.message} />
                    <Input {...register("bairro")} label="Bairro" helperText={errors.bairro?.message} />
                    <div className="border border-COLORS-TEXT_WHITE mt-2">
                        <select {...register("role")} className="bg-COLORS-BACKGROUND_UI w-full p-2">
                            <option value="">Selecione o acesso</option>
                            <option value="admin">Administrador</option>
                            <option value="membro">Membro</option>
                        </select>
                        {errors.bairro && <p className="text-COLORS-ERROR_TEXT mt-1">{errors.role?.message}</p>}
                    </div>
                </div>
                <div className=" mt-4 flex justify-end text-xl space-x-1">
                    {!user?.id && <Button >Salvar cadastro</Button>}
                    {user?.id && <Button >Salvar alterações</Button>}
                    <Button type="button" onClick={handleBack}>Voltar para usuários</Button>
                </div>
            </form>
        </main>
    );
}

