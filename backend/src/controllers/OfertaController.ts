import { Request, Response } from "express";
import { prisma } from "../database";

class OfertaController {
    async createOferta(req: Request, res: Response) {
        const { tipo, nome, mensagem, valor, userId } = req.body;

        const result = await prisma.oferta.create({
            data: {
                tipo,
                nome,
                mensagem,
                valor,
                userId,
            },
        });
        return res.json({
            error: false,
            message: "Sucesso: Oferta cadastrada com sucesso!",
            result,
        });
    }
}

export default OfertaController;
