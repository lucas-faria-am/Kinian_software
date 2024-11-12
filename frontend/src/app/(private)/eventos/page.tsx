import Container from '@/components/Container'
import { Modal } from '@/components/Modal';
import EventForm from './components/EventForm';
import Calendar from './components/Calendario';
import { getAllEvent } from '@/api/eventoApi';

export default async function Eventos() {
    const eventos = await getAllEvent();
    console.log(eventos);

    return (
        <Container>
            <div className="flex h-full justify-center items-center">
                <div className="flex flex-col gap-4 items-center bg-blue-200 text-gray-900 p-4 h-[80%] w-[70%] rounded-lg">
                    <h1 className="font-semibold text-lg">Eventos</h1>
                    <div className="w-full flex justify-end">
                        <EventForm />
                    </div>
                    <div className="h-[100%] w-full">
                        <Calendar eventos={eventos} />
                    </div>
                </div>
            </div>
        </Container>
    )
}
