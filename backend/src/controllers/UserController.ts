import { Request, Response } from "express";
import { prisma } from "../database";
import { User } from "@prisma/client";
import { NotFoundError } from "../helpers/api-erros";

class UserController {
    async create(req: Request, res: Response) {
        const user: User = req.body;
        const userExist = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (userExist) {
            return res.json({
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
        const users = await prisma.user.findMany();

        return res.json({
            message: "Sucesso: Usuários encontrados!",
            users,
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
        console.log(`\nUser:${id}\n`);
        console.log(user);
        return res.json({
            message: "Sucesso: Usuário encontrado!",
            user,
        });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data: User = req.body;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            throw new NotFoundError("Usuário não encontrado!");
        }

        const userUpdated = await prisma.user.update({
            where: { id: Number(id) },
            data: data,
        });

        return res.json({
            message: "Sucesso: Usuário atualizado!",
            userUpdated,
        });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!user) {
            throw new NotFoundError("Usuário não encontrado!");
        }

        const userDeleted = await prisma.user.delete({
            where: { id: Number(id) },
        });

        return res.json({
            message: "Sucesso: Usuário deletado",
            userDeleted,
        });
    }
}

export default UserController;
