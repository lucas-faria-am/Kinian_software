"use client"
import { EventosProps } from '@/@types/EventosProps';
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import EventForm from './EventForm';

type CalendarProps = {
    eventos: EventosProps[],
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Calendar(props: CalendarProps) {
    const eventos = props.eventos;

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy', { locale: ptBR }))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date(), { locale: ptBR })

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    })

    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy', { locale: ptBR }))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy', { locale: ptBR }))
    }

    let selectedDayEvents = eventos.filter((eventos) =>
        isSameDay(parseISO(eventos.data), selectedDay)
    )

    return (
        <div className="pt-16">
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                    <div className="md:pr-14">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-900">
                                {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: ptBR })}
                            </h2>
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-700"
                            >
                                <span className="sr-only">Mês anterior</span>
                                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-500 hover:text-gray-700"
                            >
                                <span className="sr-only">Próximo anterior</span>
                                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                            <div>D</div>
                            <div>S</div>
                            <div>T</div>
                            <div>Q</div>
                            <div>Q</div>
                            <div>S</div>
                            <div>S</div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day, dayIdx) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDay(day)}
                                        className={classNames(
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) &&
                                            isToday(day) &&
                                            'text-blue-800 font-bold',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-500',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-blue-800',
                                            isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            'bg-blue-800',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) &&
                                            'font-semibold',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >
                                        <time dateTime={format(day, 'dd-MM-yyyy')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>

                                    <div className="w-2 h-2 mx-auto mt-1">
                                        {eventos.some((evento) =>
                                            isSameDay(parseISO(evento.data), day)
                                        ) && (
                                                <div className="w-2 h-2 rounded-full bg-sky-600"></div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <h1 className="font-semibold">Dias com eventos:{" "}</h1>
                            <div className="w-2 h-2 rounded-full bg-sky-600"></div>
                        </div>

                    </div>
                    <section className="mt-12 md:mt-0 md:pl-14" style={{ overflowY: 'auto', height: 400 }}>
                        <h2 className="font-semibold text-gray-900">
                            Eventos para{' '}
                            <time dateTime={format(selectedDay, 'dd-MM-yyyy', { locale: ptBR })}>
                                {format(selectedDay, 'dd MMM, yyy', { locale: ptBR })}
                            </time>
                        </h2>
                        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-900">
                            <ul className="flex flex-col gap-1">
                                {selectedDayEvents.length > 0 ? (
                                    selectedDayEvents.map((evento) => (
                                        <li key={evento.id} className="flex border border-blue-950 bg-blue-900 p-2 rounded-md items-center justify-between">
                                            <span className="text-COLORS-TEXT_WHITE font-normal">
                                                {evento.descricao}

                                            </span>
                                            <EventForm edit evento={evento} />
                                        </li>
                                    ))
                                ) : (
                                    <p>Não há eventos hoje.</p>
                                )}
                            </ul>
                        </ol>
                    </section>
                </div>
            </div>
        </div>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
