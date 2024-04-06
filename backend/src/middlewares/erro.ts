import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-erros";

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    Req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(error.statusCode);
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal Server Error";
    return res.status(statusCode).json({ message });
};
