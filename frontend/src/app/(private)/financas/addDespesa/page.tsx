import Container from '@/components/Container'
import React from 'react'
import FinanceForm from '../components/FinanceForm'

export default function AdicionarReceita() {
    return (
        <Container>
            <div className="flex h-full justify-center items-center">
                <FinanceForm tipo="despesa" />
            </div>
        </Container>
    )
}
