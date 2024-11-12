import { Request, Response } from "express";
import { prisma } from "../database";
import { BadRequestError } from "../helpers/api-erros";

class ContaController {
    async getConta(req: Request, res: Response) {
        const result = await prisma.conta.findUnique({
            where: { id: 1 },
            include: {
                despesas: true,
                receitas: true,
            },
        });

        return res.json({
            message: "Sucesso: Conta encontrada!",
            result,
        });
    }

    async getMonthlySums(req: Request, res: Response) {
        const currentYear = new Date().getFullYear();

        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const result = [];

        const conta = await prisma.conta.findUnique({
            where: { id: 1 },
            include: {
                despesas: true,
                receitas: true,
            },
        });

        const despesas = conta?.despesas || [];
        const receitas = conta?.receitas || [];

        for (const month of months) {
            const firstDay = new Date(currentYear, month - 1, 1);
            const lastDay = new Date(currentYear, month, 0);

            let monthSumReceita = 0;
            let monthSumDespesa = 0;

            for (const receita of receitas) {
                if (receita.data >= firstDay && receita.data <= lastDay) {
                    monthSumReceita += receita.valor;
                }
            }

            for (const despesa of despesas) {
                if (despesa.data >= firstDay && despesa.data <= lastDay) {
                    monthSumDespesa += despesa.valor;
                }
            }

            result.push({
                month: month,
                sumReceita: monthSumReceita,
                sumDespesa: monthSumDespesa,
            });
        }

        return res.json({
            message: "Sucesso: Receitas e despesas mensais encontradas!",
            result,
        });
    }

    async getMonthBalance(req: Request, res: Response) {
        const { month, year } = req.query;

        if (
            !month ||
            isNaN(Number(month)) ||
            Number(month) < 1 ||
            Number(month) > 12
        ) {
            return res.status(400).json({ error: "Mês inválido" });
        }

        if (!year || isNaN(Number(year))) {
            return res.status(400).json({ error: "Ano inválido" });
        }

        const selectedMonth = Number(month);
        const selectedYear = Number(year);

        const conta = await prisma.conta.findUnique({
            where: { id: 1 },
            include: {
                despesas: true,
                receitas: true,
            },
        });

        const despesas = conta?.despesas || [];
        const receitas = conta?.receitas || [];

        const filteredDespesas = despesas.filter((despesa) => {
            const despesaMonth = new Date(despesa.data).getMonth() + 1;
            const despesaYear = new Date(despesa.data).getFullYear();
            return (
                despesaMonth === selectedMonth && despesaYear === selectedYear
            );
        });

        const filteredReceitas = receitas.filter((receita) => {
            const receitaMonth = new Date(receita.data).getMonth() + 1;
            const receitaYear = new Date(receita.data).getFullYear();
            return (
                receitaMonth === selectedMonth && receitaYear === selectedYear
            );
        });

        const totalDespesas = filteredDespesas.reduce(
            (total, despesa) => total + despesa.valor,
            0
        );
        const totalReceitas = filteredReceitas.reduce(
            (total, receita) => total + receita.valor,
            0
        );

        const saldo = totalReceitas - totalDespesas;

        const result = {
            despesas: filteredDespesas,
            receitas: filteredReceitas,
            balanco: saldo,
        };

        if (
            result.despesas.length === 0 &&
            result.despesas.length === 0 &&
            result.balanco === 0
        ) {
            throw new BadRequestError("Não há registros desta data!");
        }

        return res.json({
            message: "Sucesso: balanço mensal concluído!",
            result,
        });
    }
}

export default ContaController;
