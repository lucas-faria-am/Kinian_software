import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-erros";
import jwt from "jsonwebtoken";
import { prisma } from "../database";
import { PRIVATE_ROUTES } from "../constants/privateRoutes";
import { JwtPayload } from "../@types/jwtPayLoad";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    const pahtname = req.path;

    if (!authorization) {
        throw new UnauthorizedError("Não autorizado");
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_PASS!) as JwtPayload;

        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            throw new UnauthorizedError("Não autorizado");
        }

        if (user.role == "admin") {
            if (
                PRIVATE_ROUTES.ADMIN.some((route) => pahtname.startsWith(route))
            ) {
                console.log("\nAdmin: permitido\n");
            } else {
                throw new UnauthorizedError("Não autorizado");
            }
        }

        if (user.role == "member") {
            if (
                PRIVATE_ROUTES.MEMBER.some((route) =>
                    pahtname.startsWith(route)
                )
            ) {
                console.log("Member: Permitido");
            } else {
                throw new UnauthorizedError("Não autorizado");
            }
        }
    } catch (error) {
        throw new UnauthorizedError("Não autorizado");
    }

    next();
};
