import Container from '@/components/Container'
import EventForm from '../components/EventForm'

export default function AddEvento() {
    return (
        <Container>
            <div className="flex h-full justify-center items-center">
                <EventForm />
            </div>
        </Container>
    )
}
