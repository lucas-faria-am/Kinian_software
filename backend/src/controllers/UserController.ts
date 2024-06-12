import { Request, Response } from "express";
import { prisma } from "../database";
import { User } from "@prisma/client";
import {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} from "../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../@types/jwtPayLoad";

class UserController {
    async login(req: Request, res: Response) {
        const user: User = req.body;

        const userExist = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (!userExist) {
            throw new BadRequestError("E-mail ou senha inválidos");
        }

        const verifyPass = await bcrypt.compare(user.senha, userExist.senha);

        if (!verifyPass) {
            throw new BadRequestError("E-mail ou senha inválidos");
        }

        const token = jwt.sign(
            {
                id: userExist.id,
                nome: userExist.nome,
                role: userExist.role,
            },
            process.env.JWT_PASS!,
            {
                expiresIn: "6h",
            }
        );

        return res.json(token);
    }

    async register(req: Request, res: Response) {
        const user: User = req.body;

        const userExist = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (userExist) {
            throw new BadRequestError("Erro: Usuário já existe!");
        }
        user.senha = await bcrypt.hash(user.senha, 10);

        const result = await prisma.user.create({
            data: user,
        });
        return res.status(201).json({
            message: "Sucesso: Usuário cadastrado!",
            result,
        });
    }

    async getProfile(req: Request, res: Response) {
        const { authorization } = req.headers;

        const token = authorization!.split(" ")[1];

        try {
            const { id } = jwt.verify(
                token,
                process.env.JWT_PASS!
            ) as JwtPayload;

            if (!id) {
                throw new UnauthorizedError("Não autorizado");
            }

            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });

            if (!user) {
                throw new UnauthorizedError("Não autorizado");
            }

            res.json({
                user,
            });
        } catch (error) {
            throw new UnauthorizedError("Não autorizado");
        }
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
        const user: User = req.body;

        const userExist = await prisma.user.findUnique({
            where: { id: Number(id) },
        });

        if (!userExist) {
            throw new NotFoundError("Usuário não encontrado!");
        }
        user.senha = await bcrypt.hash(user.senha, 10);
        if (user.email) {
            const updatedUser = await prisma.user.update({
                where: { id: Number(id) },
                data: user,
            });

            return res.json({
                message: "Sucesso: Usuário atualizado!",
                updatedUser,
            });
        } else {
            throw new BadRequestError("dados imcompletos!");
        }
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
