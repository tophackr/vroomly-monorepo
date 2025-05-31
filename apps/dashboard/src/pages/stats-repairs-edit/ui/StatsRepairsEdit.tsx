'use client'

import type { JSX } from 'react'
import { List } from 'tmaui'
import { useCarContext } from '@/entities/car'
import { RepairField, useFindAllRepairsQuery } from '@/entities/repair'
import { useLogger } from '@/shared/model'
import { RepairsEditFormProvider } from './RepairsEditFormProvider'
import { RepairsEditSkeleton } from './RepairsEditSkeleton'
import { RepairsSaveButton } from './RepairsSaveButton'

export function StatsRepairsEdit(): JSX.Element {
    const { error: logError } = useLogger()

    const { car } = useCarContext()
    const {
        data: repairs,
        isLoading,
        isError,
        error
    } = useFindAllRepairsQuery({ carId: car.id })

    if (isError) logError('StatsPartsEdit', error)

    if (isLoading || !repairs) return <RepairsEditSkeleton />

    return (
        <List>
            <RepairsEditFormProvider repairs={repairs}>
                {repairs?.map(repair => (
                    <RepairField
                        key={repair.id}
                        repair={repair}
                    />
                ))}

                <RepairsSaveButton />
            </RepairsEditFormProvider>
        </List>
    )
}
