import { EventosProps } from '@/@types/EventosProps';
import { compareAsc, endOfWeek, format, isWithinInterval, parseISO, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';



export const EventList = ({ eventos }: { eventos: EventosProps[] }) => {
    const today = startOfToday();
    console.log(eventos);

    const endOfThisWeek = endOfWeek(today, { locale: ptBR });

    const weeklyEvents = eventos.filter(evento =>
        isWithinInterval(parseISO(evento.data), { start: today, end: endOfThisWeek })
    );

    const sortedWeeklyEvents = weeklyEvents.sort((a, b) =>
        compareAsc(parseISO(a.data), parseISO(b.data))
    );

    return (
        <div className="h-full" style={{ overflowY: 'auto', height: 370 }}>
            <h1 className="font-bold p-4">Eventos desta semana</h1 >
            <ul className="flex flex-col gap-6 w-full">
                {sortedWeeklyEvents.map(event => (
                    <li className="flex flex-col border rounded-xl p-1 mx-3" key={event.id}>
                        <span className="px-3 font-semibold">{event.descricao}</span>
                        <span className="px-3 font-normal">
                            {format(parseISO(event.data), 'PPPP', { locale: ptBR })}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};