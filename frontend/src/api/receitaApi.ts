"use server";

import { FinanceProps } from "@/@types/FinanceProps";
import { fetchWrapper } from "@/functions/fetchWrapper";
import { revalidatePath } from "next/cache";
import { formatDataIsoBr } from "../functions/formatDataIsoBr";

type DataProps = {
    descricao: string;
    valor: string;
    data: string;
};

export const createReceita = async (data: DataProps) => {
    console.log(data);

    const res = await fetchWrapper("receita", {
        method: "POST",
        body: JSON.stringify(data),
    });

    const receita = await res.json();

    if (res.status == 400) {
        console.log(receita.message);
        return { success: false, message: receita.message };
    }
    if (res.status == 201) {
        revalidatePath("/usuario");
        return { success: true, message: receita.message };
    }
};

export const deleteReceita = async (id: string) => {
    const res = await fetchWrapper(`receita/${id}`, {
        method: "DELETE",
    });

    const result = await res.json();

    revalidatePath("/financas");
    return {
        message: result.message as string,
    };
};
