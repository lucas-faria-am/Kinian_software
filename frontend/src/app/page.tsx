"use client"
import { login } from "@/api/login";
import { Button } from "@/components/Button";
import Container from "@/components/Container";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Insira um email válido"),
  senha: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
});

export type FormLoginProps = z.infer<typeof schema>;

export default function Login() {
  // const route = Router()
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<FormLoginProps>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schema)
  });

  const handleLogin = async (data: FormLoginProps) => {
    const session = await login(data);
    if (!session.error) {

      toast.success(`Bem vindo de volta ${session.user.nome}`);
      router.replace("/dashboard");
    }

    if (session.error) {
      toast.error(`${session.message}`);
    }
  }

  const forgetPassword = () => {

    router.push("/forgetPassword/");

  }
  return (
    <Container>
      <div className="bg-COLORS-BACKGROUND_UI text-COLORS-TEXT_WHITE rounded-sm p-4 w-1/4">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className=" my-1 p-4">
            <h1 className="flex justify-center text-xl">Login</h1>
          </div>
          <div className=" columns-1 space-x-1">
            <Input {...register("email")} label="Email" helperText={errors.email?.message} />
            <Input {...register("senha")} label="Senha" helperText={errors.senha?.message} />
          </div>
          <div className="mt-4 flex justify-center text-xl flex-col">
            <Button >Entrar</Button>
            <button type="button" onClick={forgetPassword} className="text-blue-600 font-semibold">Esqueceu a senha?</button>
          </div>
        </form>
      </div>
    </Container>
  );
}