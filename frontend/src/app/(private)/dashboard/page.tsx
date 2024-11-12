import { getConta, getSumMontly } from '@/api/contaApi';
import Container from '@/components/Container';
import BarChart from './components/BarChart';
import Card, { CardContent } from './components/Card';
import { EventList } from './components/EventsList';
import { getAllEvent } from '@/api/eventoApi';
import { Button } from '@/components/Button';
import RelatorioMonthly from './components/RelatorioMonthly';

export default async function Dashboard() {
    const monthlySums = await getSumMontly();
    const balanceConta = await getConta();
    // const lastMonth = await getLastMonth();
    const eventos = await getAllEvent();

    return (
        <Container>
            <>
                <div className="flex flex-col gap-6 w-full p-4 text-COLORS-TEXT_WHITE">
                    <div className="grid w-full grid-cols-3 gap-4 gap-x-6">
                        <Card amount={balanceConta.saldo} title='Saldo' discription='Saldo disponivel na conta' />
                        {/* <Card amount={lastMonth.balanco} title='Balanço do ultimos mês' discription={`Mês de ${lastMonth.nome}`} /> */}
                        <Card amount={`+${0}`} title='Balanço do ultimos mês' discription={`Mês de ${"Maio"}`} />
                        <Card amount={`+${0}`} title='Balanço dos ultimo 12 meses' discription={`De: ${"07/23 a 07/24"}`} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <CardContent>
                            <p className="p-4 font-semibold">Visão Geral</p>
                            <BarChart monthlySums={monthlySums} />
                            <RelatorioMonthly />
                        </CardContent>
                        <CardContent>
                            <EventList eventos={eventos} />
                        </CardContent>
                    </div>
                </div>
            </>
        </Container>
    )
}
