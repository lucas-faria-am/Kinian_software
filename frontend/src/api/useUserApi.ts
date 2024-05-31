"use server";
import { UserProps } from "@/@types/UserProps";
import { fetchWrapper } from "@/functions/fetchWrapper";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// function useUserApi() {
export const create = async (data: UserProps) => {
    const res = await fetchWrapper("user", {
        headers: { "content-type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
    });
    const result: { message: string } = await res.json();

    if (res.status == 400) {
        return { success: false, message: result.message };
    }
    if (res.status == 201) {
        revalidatePath("/usuario");
        return { success: true, message: result.message };
    }
};

export const update = async (data: UserProps, id: string) => {
    const res = await fetchWrapper(`user/${id}`, {
        headers: { "content-type": "application/json" },
        method: "PUT",
        body: JSON.stringify(data),
    });
    // console.log("log do update", res.json());

    if (res.status == 400) {
        return false;
    }
    if (res.status == 200) {
        // revalidatePath("/usuario");
        revalidatePath("/usuario");
        return true;
    }
};

export const getAll = async () => {
    const data = await fetchWrapper("user", {
        // next: { revalidate: 0 },
        cache: "no-cache",
    });
    const res = await data.json();

    return res.user;
};

export const getOne = async (id: string) => {
    const res = await fetchWrapper(`user/${id}`, {
        next: { revalidate: 0 },
    });
    return res.json();
};

// const deleteUser = async (id: string) => {
export const deleteUser = async (formData: any) => {
    const { id } = Object.fromEntries(formData);
    const res = await fetchWrapper(`user/${id}`, {
        method: "DELETE",
    });
    revalidatePath("/usuario");
    return res.json();
};

//     return {
//         create,
//         update,
//         getAll,
//         getOne,
//         deleteUser,
//     };
// }

// export { useUserApi };
