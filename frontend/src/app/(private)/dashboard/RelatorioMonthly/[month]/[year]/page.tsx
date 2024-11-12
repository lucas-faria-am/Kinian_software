import { FinanceProps } from "@/@types/FinanceProps";
import { getMonthBalance } from "@/api/contaApi";
import { Button } from "@/components/Button";
import Container from "@/components/Container";
import Link from "next/link";
import toast from "react-hot-toast";

export default async function RelatorioView({ params }: { params: { month: string } & { year: string } }) {
    const res = await getMonthBalance(params.month, params.year);
    console.log("res", res);

    const receitas: FinanceProps[] = res.receitas;
    const despesas: FinanceProps[] = res.despesas;

    if (!res?.error) {
        console.log(res.despesas);
    }
    if (res?.error) {
    }

    // alert("testando o botão visualizar por mês")

    return (
        <Container>
            <div className="flex h-screen justify-center items-center text-COLORS-TEXT_WHITE">
                <div className="flex flex-col justify-between p-[2%] bg-COLORS-BACKGROUND_UI w-[70%] h-[70%]">
                    <h1 className="flex justify-center font-bold">Balanço de {params.month}/{params.year}</h1>
                    <div className="flex flex-col-2 justify-between p-[2%] w-full h-full">
                        {res && <>
                            <div className="flex flex-col w-[40%] border border-COLORS-TEXT_WHITE rounded-xl p-2">
                                <h1 className="flex justify-center font-semibold">Receitas</h1>
                                <ul className="flex flex-col gap-1">
                                    {receitas.map((receita) => (
                                        <li key={receita.id} className="flex justify-center p-1 border border-COLORS-TEXT_WHITE rounded-xl">
                                            <span className="p">{receita.descricao} Valor: R${receita.valor} data: {receita.data}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col w-[40%] border border-COLORS-TEXT_WHITE rounded-xl p-2">
                                <h1 className="flex justify-center font-semibold">Despesas</h1>
                                <ul>
                                    {despesas.map((despesa) => (

                                        <li key={despesa.id} className="flex justify-center p-1 border border-COLORS-TEXT_WHITE rounded-xl">
                                            <span className="p">{despesa.descricao} Valor: R${despesa.valor} data: {despesa.data}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                        }
                        {!res && <div className="flex w-full justify-center p-4">
                            <div className="flex flex-col gap-2">
                                <span>Não ha registros deste mês</span>
                                <Link href="/dashboard/" className="flex justify-center bg-blue-500 border border-blue-500 rounded-xl">
                                    Voltar ao dashboard
                                </Link>
                            </div>
                        </div>
                        }

                    </div>
                    <span className="flex justify-end font-bold p-2">Saldo mensal: R$ {res.balanco}</span>
                    {/* <h1>Relatório do{res.month}{res.year}</h1> */}
                    <div className="flex gap-2">
                        <Link
                            className={`rounded-lg self-center p-2 bg-COLORS-BTN_BLUE font-bold
                                hover:bg-opacity-80 shadow-2xl `}
                            href={"/dashboard"}>Voltar ao dashboard
                        </Link>
                        <Button>Imprimir relatório</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}
