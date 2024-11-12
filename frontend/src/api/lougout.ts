"use server";

import { AUTH } from "@/constants/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
    const token = cookies().get(AUTH.COOKIE_TOKEN);

    if (token) {
        cookies().delete(AUTH.COOKIE_TOKEN);
    }
    redirect("/");
};
