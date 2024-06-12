"use server";

import { UserProps } from "@/@types/UserProps";
import { FormLoginProps } from "@/app/page";
import { URL } from "@/constants/apiUrl";
import { AUTH } from "@/constants/auth";
import { cookies } from "next/headers";

export const login = async (data: FormLoginProps) => {
    try {
        const result = await fetch(`${URL.BASE_URL}/user/login`, {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });
        if (result.ok) {
            const userToken = await result.json();

            const getProfile = await fetch(`${URL.BASE_URL}/user/profile`, {
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${userToken}`,
                },
            });
            const res = await getProfile.json();
            const user = res.user;
            if (user.role === "member") {
                return {
                    error: true,
                    message: "Não autorizado!: Somente administrador",
                };
            }
            cookies().set(AUTH.COOKIE_TOKEN, userToken);
            return {
                error: false,
                user,
            };
        }
        return {
            error: true,
            message: "Usuário ou senha inválidos",
        };
    } catch (error: any) {
        return {
            error: true,
            message: "Usuário ou senha inválidos",
        };
    }
};
