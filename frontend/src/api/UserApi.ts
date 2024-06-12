"use server";

import { UserProps } from "@/@types/UserProps";
import { fetchWrapper } from "@/functions/fetchWrapper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const create = async (data: UserProps) => {
    console.log(data);

    const res = await fetchWrapper("user/register", {
        method: "POST",
        body: JSON.stringify(data),
    });

    const user = await res.json();

    if (res.status == 400) {
        console.log(user.message);
        return { success: false, message: user.message };
    }
    if (res.status == 201) {
        revalidatePath("/usuario");
        return { success: true, message: user.message };
    }
};

export const update = async (data: UserProps, id: string) => {
    const res = await fetchWrapper(`user/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
    const user = await res.json();
    if (res.status == 400) {
        return {
            error: true,
            message: user.message,
        };
    }
    if (res.status == 200) {
        revalidatePath("/usuario");
        return {
            error: false,
            message: user.message,
        };
    }
};

export const getAll = async () => {
    const res = await fetchWrapper("user", {
        cache: "no-cache",
    });
    const data = await res.json();

    return data.user;
};

export const getOne = async (id: string) => {
    const res = await fetchWrapper(`user/${id}`, {
        next: { revalidate: 0 },
    });

    return res.json();
};

export const getProfile = async () => {
    const res = await fetchWrapper(`user/profile`, {
        next: { revalidate: 0 },
    });
    const result = await res.json();

    if (res.status == 401) {
        return false;
    }
    return result;
};

export const deleteUser = async (id: string) => {
    const res = await fetchWrapper(`user/${id}`, {
        method: "DELETE",
    });
    const result = await res.json();

    revalidatePath("/usuario");
    return {
        message: result.message as string,
    };
};
