'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { Cell, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useInteractionContext } from '@/entities/interaction'
import { isRepair, useFindAllRepairsQuery } from '@/entities/repair'
import { useLogger } from '@/shared/model'
import { SelectedSkeleton } from './SelectedSkeleton'

export function RepairSection(): JSX.Element | undefined {
    const t = useTranslations('CarActionForm')
    const { error: logError } = useLogger()

    const {
        interaction: { repairInteractions, carId }
    } = useInteractionContext()

    const { data, isLoading, isError, error } = useFindAllRepairsQuery({
        carId
    })

    if (isError) logError('widget.RepairSection', error)

    const ids = useMemo(
        () => repairInteractions.map(repair => repair.repairId),
        [repairInteractions]
    )
    const repairListFiltered = useMemo(
        () => data?.filter(({ id }) => ids.includes(id)),
        [data, ids]
    )

    if (isLoading) return <SelectedSkeleton />

    return repairListFiltered?.length ? (
        <Section header={t('repair_work.title')}>
            {repairListFiltered?.map(({ id, option }) => (
                <Cell key={id}>
                    {isRepair(option)
                        ? t(`repair_work.options.${option}`)
                        : option}
                </Cell>
            ))}
        </Section>
    ) : undefined
}
