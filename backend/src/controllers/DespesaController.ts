import { Request, Response } from "express";
import { prisma } from "../database";

class DespesaController {
    async create(req: Request, res: Response) {
        const despesa = req.body;

        const result = await prisma.oferta.create({
            data: despesa,
        });
        return res.json({
            message: "Sucesso: Despesa adicionada!",
            result,
        });
    }
}

export default DespesaController;
