"use server";
import { FinanceProps } from "@/@types/FinanceProps";
import { fetchWrapper } from "@/functions/fetchWrapper";
import { formatDataIsoBr } from "@/functions/formatDataIsoBr";

export const getConta = async () => {
    const res = await fetchWrapper("conta", {
        cache: "no-cache",
    });
    const conta = await res.json();

    const receita: FinanceProps[] = conta.result.receitas;
    const despesa: FinanceProps[] = conta.result.despesas;

    receita.map((receita) => {
        const dataBR = formatDataIsoBr(receita.data);

        receita.data = dataBR;
    });

    despesa.map((despesa) => {
        const dataBR = formatDataIsoBr(despesa.data);

        despesa.data = dataBR;
    });

    conta.result.receita = receita;
    conta.result.despesa = despesa;

    return conta.result;
};

export const getSumMontly = async () => {
    const res = await fetchWrapper("conta/sum", {
        cache: "no-cache",
    });
    const data = await res.json();

    return data.result;
};

export const getMonthBalance = async (month: string, year: string) => {
    const res = await fetchWrapper(`conta/month?month=${month}&year=${year}`, {
        cache: "no-cache",
    });
    if (res.status === 400) {
        return false;
    }

    const balance = await res.json();

    const receita: FinanceProps[] = balance.result.receitas;
    const despesa: FinanceProps[] = balance.result.despesas;

    receita.map((receita) => {
        const dataBR = formatDataIsoBr(receita.data);

        receita.data = dataBR;
    });

    despesa.map((despesa) => {
        const dataBR = formatDataIsoBr(despesa.data);

        despesa.data = dataBR;
    });

    console.log("teste", balance.result);

    const dataBR = formatDataIsoBr(balance.result.data);
    balance.result.data = dataBR;

    return balance.result;
};
