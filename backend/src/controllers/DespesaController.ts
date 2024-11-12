import { Request, Response } from "express";
import { prisma } from "../database";
import { parseDateString } from "../functions/parseDateString";
import { NotFoundError } from "../helpers/api-erros";

class DespesaController {
    async create(req: Request, res: Response) {
        const despesa = req.body;
        despesa.valor = parseFloat(despesa.valor);
        despesa.contaId = Number(despesa.contaId);
        despesa.data = parseDateString(despesa.data);
        despesa.contaId = 1;

        const result = await prisma.despesa.create({
            data: despesa,
        });

        return res.status(201).json({
            message: "Sucesso: Despesa adicionada!",
            result,
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const receitaExist = await prisma.despesa.findUnique({
            where: { id: Number(id) },
        });

        if (!receitaExist) {
            throw new NotFoundError("Despesa não encontrada!");
        }

        const result = await prisma.despesa.delete({
            where: { id: Number(id) },
        });

        return res.json({
            message: "Sucesso: Despesa deletada!",
            result,
        });
    }
}

export default DespesaController;
