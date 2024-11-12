import { Request, Response } from "express";
import { prisma } from "../database";

class OfertaController {
    async create(req: Request, res: Response) {
        const oferta = req.body;

        const result = await prisma.oferta.create({
            data: oferta,
        });
        return res.status(201).json({
            message: "Sucesso: Oferta concluída!",
            result,
        });
    }
}

export default OfertaController;
