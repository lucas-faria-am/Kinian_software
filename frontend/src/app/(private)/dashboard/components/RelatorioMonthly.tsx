"use client";
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { SquareX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    month: z.string().min(1, "Insira a mês"),
    year: z.string().min(4, "Insira o ano"),
});

type FormProps = z.infer<typeof schema>;

export default function RelatorioMonthly() {
    const [openMoldal, setOpenMoldal] = useState(false);
    const router = useRouter();

    const {
        handleSubmit,
        register,
        setValue,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormProps>({
        defaultValues: {
            month: '',
            year: ''
        },
        mode: 'all',
        criteriaMode: 'all',
        resolver: zodResolver(schema)
    });

    const handleBuscar = async (data: FormProps) => {
        reset();
        console.log("teste");
        router.push(`/dashboard/RelatorioMonthly/${data.month}/${data.year}`)
        setOpenMoldal(!openMoldal);
    }

    return (
        <Dialog open={openMoldal}>
            <DialogTrigger asChild className="text-COLORS-TEXT_WHITE">
                <Button type="button" onClick={() => setOpenMoldal(!openMoldal)} variant={"secondary"} className="w-auto">
                    Relatório mensal
                </Button>
            </DialogTrigger>

            <DialogContent className={`flex bg-black/90 fixed inset-0 justify-center items-center`}>
                <div className="bg-COLORS-BACKGROUND_UI text-COLORS-TEXT_WHITE p-4 border border-COLORS-TEXT_WHITE rounded-lg">
                    <DialogHeader>
                        <div className="flex justify-between items-center">
                            <DialogTitle>Relatório mensal
                            </DialogTitle>
                            <DialogClose asChild><button type="button" onClick={() => setOpenMoldal(!openMoldal)}><SquareX size={30} /></button></DialogClose>
                        </div>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <main className="rounded-sm text-COLORS-TEXT_WHITE">
                        <form onSubmit={handleSubmit(handleBuscar)}>
                            <div className="flex flex-col gap-x-4 gap-y-1">
                                <div className="border border-COLORS-TEXT_WHITE mt-2">
                                    <select {...register("month")} className="bg-COLORS-BACKGROUND_UI w-full p-2" >
                                        <option value="">Selecione o Mês</option>
                                        <option value="1">Janeiro</option>
                                        <option value="2">Fevereiro</option>
                                        <option value="3">Março</option>
                                        <option value="4">Abril</option>
                                        <option value="5">Maio</option>
                                        <option value="6">Junho</option>
                                        <option value="7">Julho</option>
                                        <option value="8">Agosto</option>
                                        <option value="9">Setembro</option>
                                        <option value="10">Outubro</option>
                                        <option value="11">Novembro</option>
                                        <option value="12">Dezembro</option>
                                    </select>
                                    {errors.month && <p className="text-COLORS-ERROR_TEXT mt-1">{errors.month?.message}</p>}
                                </div>
                                <Input {...register("year")} label="Data" datatype="dd/mm/yyyy" helperText={errors.year?.message} />
                            </div>
                            <div className=" mt-7 flex justify-end text-xl space-x-1">
                                <Button disabled={isSubmitting} variant={"secondary"}>{isSubmitting ? "Buscando..." : "Buscar"}</Button>
                            </div>
                        </form>
                    </main >
                </div>
            </DialogContent>
        </Dialog>
    );

};