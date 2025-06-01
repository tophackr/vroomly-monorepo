import type { JSX } from 'react'
import { Outlet, useParams } from 'react-router'
import { CarProvider, MileageProvider } from '@/entities/car'

export function CarIdLayout(): JSX.Element {
    const { carId } = useParams()

    if (!carId) {
        throw new Error('CarIdLayout requires a carId parameter.')
    }

    return (
        <CarProvider carId={carId}>
            <MileageProvider>
                <Outlet />
            </MileageProvider>
        </CarProvider>
    )
}
