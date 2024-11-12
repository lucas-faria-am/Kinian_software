"use server";

import { EventosProps } from "@/@types/EventosProps";
import { fetchWrapper } from "@/functions/fetchWrapper";
import { formatDataIsoBr } from "@/functions/formatDataIsoBr";
import { revalidatePath } from "next/cache";

export const createEvent = async (data: EventosProps) => {
    const res = await fetchWrapper("evento", {
        method: "POST",
        body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath("/eventos");
    return {
        error: false,
        message: result.message,
    };
};

export const getAllEvent = async () => {
    const res = await fetchWrapper("evento/findAll", {
        cache: "no-cache",
    });
    const eventos = await res.json();

    // eventos.result.map((evento: EventosProps) => {
    //     const dataBR = formatDataIsoBr(evento.data);
    //     console.log(dataBR);

    //     evento.data = dataBR;
    // });

    return eventos.result;
};

export const updateEvent = async (data: EventosProps, id: string) => {
    const res = await fetchWrapper(`evento/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const result = await res.json();

    if (res.status == 400) {
        return {
            error: true,
            message: result.message,
        };
    }
    if (res.status == 200) {
        revalidatePath("/eventos");
        return {
            error: false,
            message: result.message,
        };
    }
};

export const deleteEvent = async (id: string) => {
    const res = await fetchWrapper(`evento/${id}`, {
        method: "DELETE",
    });
    const result = await res.json();

    revalidatePath("/eventos");
    return {
        message: result.message,
    };
};
