import { Request, Response } from "express";
import { prisma } from "../database";
import { parseDateString } from "../functions/parseDateString";
import { NotFoundError } from "../helpers/api-erros";

class ReceitaController {
    async create(req: Request, res: Response) {
        const receita = req.body;
        receita.valor = parseFloat(receita.valor);
        receita.contaId = Number(receita.contaId);
        receita.data = parseDateString(receita.data);
        receita.contaId = 1;

        const result = await prisma.receita.create({
            data: receita,
        });
        return res.status(201).json({
            message: "Sucesso: Receita adicionada!",
            result,
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const receitaExist = await prisma.receita.findUnique({
            where: { id: Number(id) },
        });

        if (!receitaExist) {
            throw new NotFoundError("Receita não encontrada!");
        }

        const result = await prisma.receita.delete({
            where: { id: Number(id) },
        });

        return res.json({
            message: "Sucesso: Receita deletada!",
            result,
        });
    }
}

export default ReceitaController;
