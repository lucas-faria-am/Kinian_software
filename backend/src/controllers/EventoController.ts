import { Request, Response } from "express";
import { prisma } from "../database";
import { NotFoundError } from "../helpers/api-erros";
import { parseDateString } from "../functions/parseDateString";

export class EventoController {
    async create(req: Request, res: Response) {
        const evento = req.body;
        evento.data = parseDateString(evento.data);

        const result = await prisma.evento.create({
            data: evento,
        });

        return res.status(201).json({
            message: "Sucesso: Evento adicionado!",
            result,
        });
    }

    async getAll(req: Request, res: Response) {
        const result = await prisma.evento.findMany();

        return res.json({
            message: "Sucesso: eventos encontrados!",
            result,
        });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const evento = req.body;
        evento.data = parseDateString(evento.data);

        const eventoExist = await prisma.evento.findUnique({
            where: { id: Number(id) },
        });

        if (!eventoExist) {
            throw new NotFoundError("Evento não encontrado!");
        }

        const result = await prisma.evento.update({
            where: { id: Number(id) },
            data: evento,
        });

        return res.json({
            message: "Sucesso: Evento atualizado!",
            result,
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const eventoExist = await prisma.evento.findUnique({
            where: { id: Number(id) },
        });

        if (!eventoExist) {
            throw new NotFoundError("Evento não encontrado!");
        }

        const result = await prisma.evento.delete({
            where: { id: Number(id) },
        });

        return res.json({
            message: "Sucesso: Evento deletado",
            result,
        });
    }
}
