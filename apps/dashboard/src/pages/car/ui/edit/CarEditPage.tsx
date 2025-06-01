'use client'

import { lazy, Suspense, type JSX } from 'react'
import { InfoFormSkeleton } from '@/features/info-form'
import { useCarContext, useMileageContext } from '@/entities/car'
import { BackButton } from '@/shared/ui/tma'

const InfoForm = lazy(() =>
    import('@/features/info-form').then(m => ({ default: m.InfoForm }))
)

export function CarEditPage(): JSX.Element {
    const { car } = useCarContext()
    const { mileage } = useMileageContext()

    return (
        <BackButton>
            <Suspense fallback={<InfoFormSkeleton />}>
                <InfoForm
                    car={car}
                    mileage={mileage}
                />
            </Suspense>
        </BackButton>
    )
}
