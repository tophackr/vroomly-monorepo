'use client'

import type { JSX } from 'react'
import { List } from '@telegram-apps/telegram-ui'
import { useCarContext } from '@/entities/car'
import { RepairField, useFindAllRepairsQuery } from '@/entities/repair'
import { useLogger } from '@/shared/model'
import { PartsEditFormProvider } from './PartsEditFormProvider'
import { PartsEditSkeleton } from './PartsEditSkeleton'
import { PartsSaveButton } from './PartsSaveButton'

export function StatsPartsEdit(): JSX.Element {
    const { error: logError } = useLogger()

    const { car } = useCarContext()
    const {
        data: repairs,
        isLoading,
        isError,
        error
    } = useFindAllRepairsQuery({ carId: car.id })

    if (isError) logError('StatsPartsEdit', error)

    if (isLoading || !repairs) return <PartsEditSkeleton />

    return (
        <List>
            <PartsEditFormProvider repairs={repairs}>
                {repairs?.map(repair => (
                    <RepairField
                        key={repair.id}
                        repair={repair}
                    />
                ))}

                <PartsSaveButton />
            </PartsEditFormProvider>
        </List>
    )
}
