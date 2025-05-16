'use client'

import type { JSX } from 'react'
import { List } from '@telegram-apps/telegram-ui'
import { PreviewButtons } from '@/features/preview-buttons'
import { CarPreview, useCarContext } from '@/entities/car'
import { CarEditButton } from './CarEditButton'
import { DynamicInteractionList } from './DynamicInteractionList'

export function Info(): JSX.Element {
    const { car, mileage } = useCarContext()

    return (
        <>
            <CarEditButton car={car} />

            <CarPreview
                car={car}
                mileage={mileage}
            />

            <List>
                <PreviewButtons />

                <DynamicInteractionList
                    car={car}
                    slice={10}
                />
            </List>
        </>
    )
}
