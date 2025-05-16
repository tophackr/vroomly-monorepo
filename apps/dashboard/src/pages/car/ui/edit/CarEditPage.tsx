'use client'

import type { JSX } from 'react'
import { useCarContext } from '@/entities/car'
import { BackButton } from '@/shared/ui/tma'
import { DynamicInfoForm } from '../DynamicInfoForm'

export function CarEditPage(): JSX.Element {
    const { car, mileage } = useCarContext()

    return (
        <>
            <BackButton />

            <DynamicInfoForm
                car={car}
                mileage={mileage}
            />
        </>
    )
}
