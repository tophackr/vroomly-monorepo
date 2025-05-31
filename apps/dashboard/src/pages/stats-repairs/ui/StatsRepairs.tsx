'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { List } from 'tmaui'
import { useCarContext } from '@/entities/car'
import { RepairCell, useFindAllRepairsQuery } from '@/entities/repair'
import { useLogger } from '@/shared/model'
import { pagesRoute } from '@/shared/routes'
import { NothingPlaceholder } from '@/shared/ui/placeholder'
import { BackButton } from '@/shared/ui/tma'
import { EditRepairsButton } from './EditRepairsButton'
import { NothingEditButton } from './NothingEditButton'
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
            (repairs ?? [])
                .filter(repair => repair.isVisible)
                .sort((a, b) => {
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

    return (
        <BackButton route={pagesRoute.carId(car.id)}>
            <EditRepairsButton car={car} />

            {filteredRepair.length > 0 ? (
                <List>
                    {filteredRepair.map(repair => (
                        <RepairCell
                            key={repair.option}
                            commonRepair={repair}
                        />
                    ))}
                </List>
            ) : (
                <>
                    <NothingPlaceholder />
                    <NothingEditButton carId={car.id} />
                </>
            )}
        </BackButton>
    )
}
