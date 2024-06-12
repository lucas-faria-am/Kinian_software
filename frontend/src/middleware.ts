import { NextRequest, NextResponse } from "next/server";
import { getProfile } from "./api/UserApi";
import { AUTH } from "./constants/auth";
import { ROUTES } from "./constants/routes";

export async function middleware(request: NextRequest) {
    const userToken = request.cookies.get(AUTH.COOKIE_TOKEN)?.value;

    const signURL = new URL("/", request.url);
    const loggedURL = new URL("/dashboard", request.url);

    if (!userToken) {
        if (request.nextUrl.pathname === "/") {
            return NextResponse.next();
        }
        return NextResponse.redirect(signURL);
    }

    if (userToken) {
        const res = await getProfile();

        if (request.nextUrl.pathname === "/") {
            return NextResponse.next();
        }
        if (!res) {
            const newResponse = NextResponse.redirect(signURL);
            newResponse.cookies.delete(AUTH.COOKIE_TOKEN);
            return newResponse;
        }
    }

    if (userToken) {
        if (
            ROUTES.PRIVATE.some((route) =>
                request.nextUrl.pathname.startsWith(route)
            )
        ) {
            return NextResponse.next();
        }
        return NextResponse.redirect(loggedURL);
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
// matcher: [
//     "/",
//     "/dashboard:path*",
//     "/usuario:path*",
//     "/usuario/alterar:path*",
//     "/eventos:path*",
//     "/financas:path*",
//     "/dizimoOferta:path*",
// ],
