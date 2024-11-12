"use server";

import { FinanceProps } from "@/@types/FinanceProps";
import { fetchWrapper } from "@/functions/fetchWrapper";
import { revalidatePath } from "next/cache";

export const createDespesa = async (data: FinanceProps) => {
    const res = await fetchWrapper("despesa", {
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

export const deleteDespesa = async (id: string) => {
    const res = await fetchWrapper(`despesa/${id}`, {
        method: "DELETE",
    });

    const result = await res.json();

    revalidatePath("/financas");
    return {
        message: result.message as string,
    };
};
