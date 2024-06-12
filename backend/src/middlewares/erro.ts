/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-erros";

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    Req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    console.log(error.message);

    console.log("Status code: ", statusCode);
    const message = error.statusCode ? error.message : "Internal Server Error";

    if (
        error.message == "jwt expired" ||
        error.message == "invalid signature" ||
        error.message == "invalid token"
    ) {
        return res.status(401).json("Token inválido");
    }

    return res.status(statusCode).json({ message });
};
