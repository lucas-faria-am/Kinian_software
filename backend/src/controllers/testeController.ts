import { Request, Response } from "express";

export class testeController {
    async teste(req: Request, res: Response) {
        res.json({
            message: "testando",
        });
    }
}
