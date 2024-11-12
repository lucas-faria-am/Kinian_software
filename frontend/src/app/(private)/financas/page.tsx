import { FinanceProps } from '@/@types/FinanceProps'
import { getConta } from '@/api/contaApi'
import Container from '@/components/Container'
import Link from 'next/link'
import TableExcluir from './components/TableExcluir'

export default async function DizimoOferta() {
    const conta = await getConta();
    const receita: FinanceProps[] = conta.receitas;
    const despesa: FinanceProps[] = conta.despesas;
    return (
        <Container>
            <div className={`flex h-screen w-full items-start justify-center gap-7 text-COLORS-TEXT_WHITE`}>
                <div className="flex flex-col items-center bg-[#23304F] w-[90%] p-4 rounded-lg shadow-2xl gap-2 mt-24">
                    <h1 className="font-semibold text-lg">Finanças</h1>
                    <div className="flex justify-between w-full px-8">
                        <div className="flex flex-col items-center w-[40%]">
                            <h1 className="font-medium text-lg">Receitas</h1>
                            <div className="flex w-full justify-end my-3">
                                <Link
                                    className={`rounded-lg p-2 my-1 bg-COLORS-BTN_BLUE font-bold
                            hover:bg-opacity-80 shadow-2xl `}
                                    href={"financas/addReceita/"}>Adicionar receita
                                </Link>
                            </div>
                            <div
                                style={{ overflowY: 'auto', height: 450 }}
                                className="w-full"
                            >
                                <table
                                    className="w-full rounded-md border border-COLORS-TEXT_WHITE border-collapse"
                                >
                                    <thead className="border">
                                        <tr className="size-10 md:size-7">
                                            <th className="border-y px-1">#</th>
                                            <th className="border-y px-1">Descrição</th>
                                            <th className="border-y px-1">Valor</th>
                                            <th className="border-y px-1">Data</th>
                                            <th colSpan={2}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!receita &&
                                            <tr>
                                                <td colSpan={5}
                                                    className=" text-center text-COLORS-TEXT_WHITE font-medium pb-2">
                                                    <span className="pb-3 font-medium ">
                                                        Não há receitas cadastradas
                                                    </span>
                                                </td>
                                            </tr>}
                                        {receita && receita.map((receita) => (
                                            <tr
                                                key={receita.id}
                                                className="text-center size-12"
                                            >
                                                <td className="border-y px-1">{receita.id}</td>
                                                <td className="border-y px-1">{receita.descricao}</td>
                                                <td className="border-y px-1">{receita.valor}</td>
                                                <td className="border-y px-1">{receita.data}</td>
                                                <td className="border-y px-1">
                                                    <TableExcluir {...receita} tipo="receita" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div
                            className="flex flex-col items-center w-[40%]"

                        >
                            <h1 className="font-medium text-lg">Despesas</h1>
                            <div className="flex w-full justify-end my-3">
                                <Link
                                    className={`rounded-lg p-2 my-1 bg-COLORS-BTN_BLUE font-bold
                            hover:bg-opacity-80 shadow-2xl `}
                                    href={"financas/addDespesa/"}>Adicionar despesa
                                </Link>
                            </div>
                            <div
                                style={{ overflowY: 'auto', height: 450 }}
                                className="w-full"
                            >
                                <table
                                    className="w-full rounded-md border border-COLORS-TEXT_WHITE border-collapse"

                                >
                                    <thead className="border">
                                        <tr className="size-10">
                                            <th className="border-y px-1">#</th>
                                            <th className="border-y px-1">Descrição</th>
                                            <th className="border-y px-1">Valor</th>
                                            <th className="border-y px-1">Data</th>
                                            <th className="border-y px-1" colSpan={2}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {!despesa &&
                                            <tr>
                                                <td colSpan={5}
                                                    className=" text-center text-COLORS-TEXT_WHITE font-medium pb-2">
                                                    <span className="pb-3 font-medium ">
                                                        Não há despesas cadastradas
                                                    </span>
                                                </td>
                                            </tr>}
                                        {despesa && despesa.map((despesa) => (
                                            <tr
                                                key={despesa.id}
                                                className="text-center size-12"
                                            >
                                                <td className="border-y px-1">{despesa.id}</td>
                                                <td className="border-y px-1">{despesa.descricao}</td>
                                                <td className="border-y px-1">{despesa.valor}</td>
                                                <td className="border-y px-1">{despesa.data}</td>
                                                <td className="border-y px-1">
                                                    <TableExcluir {...despesa} tipo="despesa" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}
