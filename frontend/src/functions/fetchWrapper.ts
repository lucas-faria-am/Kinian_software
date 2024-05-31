import { ENV } from "@/environments";

export async function fetchWrapper(
    input: RequestInfo | URL,
    init?: RequestInit | undefined
) {
    const data = await fetch(`${ENV.BASE_URL}/${input}`, init);

    return data;
}
