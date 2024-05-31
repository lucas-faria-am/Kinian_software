"use client"
import { UserProps } from "@/@types/UserProps";
import { Button } from "@/components/Button";
import Container from "@/components/Container";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Insira um email válido"),
  senha: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
});

type FormProps = z.infer<typeof schema>;

export default function Login() {
  const router = useRouter();
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
  const handleRegister = async (data: FormProps) => {

    router.push("/usuario/");
  }

  const forgetPassword = () => {

    router.push("/forgetPassword/");

  }
  return (
    <Container>
      <div className="bg-blue-200 rounded-sm p-4 w-1/4">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className=" my-1 p-4">
            <h1 className="flex justify-center text-xl">Login</h1>
          </div>
          <div className=" columns-1 space-x-1">
            <Input {...register("email")} label="Email" helperText={errors.email?.message} />
            <Input {...register("senha")} label="Senha" helperText={errors.senha?.message} />
          </div>
          <div className="mt-4 flex justify-center text-xl flex-col">
            <Button >Entrar</Button>
            <button type="button" onClick={forgetPassword} className="text-blue-600">Esqueceu a senha?</button>
          </div>
        </form>
      </div>
    </Container>
  );
}
