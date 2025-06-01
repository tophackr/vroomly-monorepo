import type { JSX } from 'react'
import { lazy } from 'react'
import { List } from 'tmaui'
import { PreviewButtons } from '@/features/preview-buttons'
import { CarPreview, useCarContext, useMileageContext } from '@/entities/car'
import { CarEditButton } from './CarEditButton'

const InteractionList = lazy(() =>
    import('@/entities/interaction').then(m => ({ default: m.InteractionList }))
)

export function Info(): JSX.Element {
    const { car } = useCarContext()
    const { mileage } = useMileageContext()

    return (
        <>
            <CarEditButton car={car} />

            <CarPreview
                car={car}
                mileage={mileage}
            />

            <List>
                <PreviewButtons />

                <InteractionList
                    car={car}
                    slice={10}
                />
            </List>
        </>
    )
}
