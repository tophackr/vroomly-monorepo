'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { List } from '@telegram-apps/telegram-ui'
import { useCarContext } from '@/entities/car'
import { RepairCell, useFindAllRepairsQuery } from '@/entities/repair'
import { useLogger } from '@/shared/model'
import { EditRepairsButton } from './EditRepairsButton'
import { RepairsSkeleton } from './RepairsSkeleton'

export function StatsRepairs(): JSX.Element {
    const { error: logError } = useLogger()

    const { car } = useCarContext()

    const {
        data: repairs,
        isLoading,
        isError,
        error
    } = useFindAllRepairsQuery({ carId: car.id })

    if (isError) logError('StatsRepairs', error)

    const filteredRepair = useMemo(
        () =>
            repairs
                ?.filter(repair => repair.isVisible)
                ?.sort((a, b) => {
                    if (a.interaction === null && b.interaction === null)
                        return 0
                    if (a.interaction === null) return 1
                    if (b.interaction === null) return -1
                    return (
                        (a.interaction.mileage ?? 0) -
                        (b.interaction.mileage ?? 0)
                    )
                }),
        [repairs]
    )

    if (isLoading) return <RepairsSkeleton />

    // todo: if not visible

    return (
        <>
            <EditRepairsButton car={car} />

            <List>
                {filteredRepair?.map(repair => (
                    <RepairCell
                        key={repair.option}
                        commonRepair={repair}
                    />
                ))}
            </List>
        </>
    )
}
