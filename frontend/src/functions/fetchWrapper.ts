import { URL } from "@/constants/apiUrl";
import { AUTH } from "@/constants/auth";
import { cookies } from "next/headers";

export async function fetchWrapper(
    input: RequestInfo | URL,
    init?: RequestInit
) {
    const token = cookies().get(AUTH.COOKIE_TOKEN)?.value;

    const res = await fetch(`${URL.BASE_URL}/${input}`, {
        ...init,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    return res;
}
