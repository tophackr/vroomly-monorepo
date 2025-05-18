'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import type { ISegment } from '@/features/segment'
import { Segments } from '@/features/segment'
import { useCarContext } from '@/entities/car'
import {
    isMileageType,
    useFindAllInteractionsQuery
} from '@/entities/interaction'
import { useLogger } from '@/shared/model'
import { BackButton } from '@/shared/ui/tma'
import { CostData } from './CostData'
import { CostSkeleton } from './CostSkeleton'
import { useLastDayFilter } from './hooks/useLastDayFilter'
import { CostKeys } from './types'
import { calcInteractionData } from './utils/calcInteractionData'

export function StatsCost() {
    const t = useTranslations('StatsCostSegment')
    const { error: logError } = useLogger()

    const { car } = useCarContext()
    const {
        data: interactions,
        isLoading,
        isError,
        error
    } = useFindAllInteractionsQuery({
        carId: car.id
    })

    if (isError) logError('StatsCost', error)

    const interactionsCarFilter = useMemo(
        () =>
            [...(interactions ?? [])].filter(
                ({ carId, type }) => carId === car.id && !isMileageType(type)
            ),
        [car.id, interactions]
    )

    const { last30DaysFilter, last90DaysFilter, lastYearFilter } =
        useLastDayFilter()

    const last30Days = useMemo(
        () => interactionsCarFilter.filter(i => last30DaysFilter(i)),
        [interactionsCarFilter, last30DaysFilter]
    )
    const last90Days = useMemo(
        () => interactionsCarFilter.filter(i => last90DaysFilter(i)),
        [interactionsCarFilter, last90DaysFilter]
    )
    const lastYear = useMemo(
        () => interactionsCarFilter.filter(i => lastYearFilter(i)),
        [interactionsCarFilter, lastYearFilter]
    )

    const data: ISegment[] = [
        {
            key: CostKeys.thirty_days,
            label: t('thirty_days'),
            Component: <CostData {...calcInteractionData(last30Days)} />
        },
        {
            key: CostKeys.ninety_days,
            label: t('ninety_days'),
            Component: <CostData {...calcInteractionData(last90Days)} />
        },
        {
            key: CostKeys.one_year,
            label: t('one_year'),
            Component: <CostData {...calcInteractionData(lastYear)} />
        },
        {
            key: CostKeys.all_time,
            label: t('all_time'),
            Component: (
                <CostData {...calcInteractionData(interactionsCarFilter)} />
            )
        }
    ]

    if (isLoading) return <CostSkeleton />

    return (
        <BackButton>
            <Segments
                segments={data}
                defaultSegment={CostKeys.thirty_days}
            />
        </BackButton>
    )
}
