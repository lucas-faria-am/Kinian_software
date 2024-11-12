"use client"

import { Bar, BarChart as BarGraph, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts";

type BarChartProps = {
    monthlySums: {
        month: string,
        sumReceita: string,
        sumDespesa: string,
    }[];
};

export default function BarChart(props: BarChartProps) {

    const monthlySums = props.monthlySums;

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const dataReceitas = meses.map((month, index) => ({
        name: month,
        Receitas: monthlySums[index].sumReceita,
        Despesas: monthlySums[index].sumDespesa,
    }));


    return (
        <ResponsiveContainer width={"100%"} height={370}>
            <BarGraph data={dataReceitas}>

                <XAxis
                    dataKey={"name"}
                    stroke="#f8fafc"
                    fontSize={12}
                />
                <YAxis
                    stroke="#f8fcf9"
                    fontSize={12}
                    tickFormatter={(value) => `R$${value}`}
                />
                <Legend />
                <Bar dataKey={"Receitas"} radius={[4, 4, 0, 0]} fill="#16a34a" />
                <Bar dataKey={"Despesas"} radius={[4, 4, 0, 0]} fill="#7f1d1d" />
            </BarGraph>
        </ResponsiveContainer>
    )
}
