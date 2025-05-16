import type { JSX } from 'react'
import { BackButton } from '@/shared/ui/tma'
import { CarCreateButton } from './CarCreateButton'
import { DynamicCarsContent } from './DynamicCarsContent'

export function HomePage(): JSX.Element {
    return (
        <>
            <BackButton hide={true} />

            <DynamicCarsContent />

            <CarCreateButton />
        </>
    )
}
