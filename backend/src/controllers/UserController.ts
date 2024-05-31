import { Request, Response } from "express";
import { prisma } from "../database";
import { User } from "@prisma/client";
import { NotFoundError } from "../helpers/api-erros";
// import bcrypt from "bcrypt";

class UserController {
    async create(req: Request, res: Response) {
        const user: User = req.body;

        const userExist = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (userExist) {
            return res.status(400).json({
                message: "Erro: Usuário já existe!",
            });
        }
        const result = await prisma.user.create({
            data: user,
        });
        return res.status(201).json({
            message: "Sucesso: Usuário cadastrado!",
            result,
        });
    }

    async findAll(req: Request, res: Response) {
        const user = await prisma.user.findMany();

        return res.json({
            message: "Sucesso: Usuários encontrados!",
            user,
        });
    }

    async findOne(req: Request, res: Response) {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        if (!user) {
            throw new NotFoundError("Usuário não encontrado!");
        }
        return res.json({
            message: "Sucesso: Usuário encontrado!",
            user,
        });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data: User = req.body;

        const userExist = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!userExist) {
            throw new NotFoundError("Usuário não encontrado!");
        }

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: data,
        });

        return res.json({
            message: "Sucesso: Usuário atualizado!",
            user,
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userExist = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!userExist) {
            throw new NotFoundError("Usuário não encontrado!");
        }

        const user = await prisma.user.delete({
            where: { id: Number(id) },
        });

        return res.json({
            message: "Sucesso: Usuário deletado",
            user,
        });
    }
}

export default UserController;
