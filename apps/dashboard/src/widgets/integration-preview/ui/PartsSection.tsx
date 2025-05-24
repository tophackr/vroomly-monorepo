'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { Cell, Section } from '@telegram-apps/telegram-ui'
import { useTranslations } from 'use-intl'
import { useInteractionContext } from '@/entities/interaction'
import { isPart, useFindAllPartsQuery } from '@/entities/part'
import { useLogger } from '@/shared/model'
import { SelectedSkeleton } from './SelectedSkeleton'

export function PartsSection(): JSX.Element | undefined {
    const t = useTranslations('CarActionForm')
    const { error: logError } = useLogger()

    const {
        interaction: { partInteractions, carId }
    } = useInteractionContext()

    const { data, isLoading, isError, error } = useFindAllPartsQuery({
        carId
    })

    if (isError) logError('widgets.PartsSection', error)

    const ids = useMemo(
        () => partInteractions?.map(part => part.partId),
        [partInteractions]
    )
    const partsListFiltered = useMemo(
        () => data?.filter(data => ids.includes(data.id)),
        [data, ids]
    )

    if (isLoading) return <SelectedSkeleton />

    return partsListFiltered?.length ? (
        <Section header={t('parts_work.title')}>
            {partsListFiltered?.map(({ id, option }) => (
                <Cell key={id}>
                    {isPart(option)
                        ? t(`parts_work.options.${option}`)
                        : option}
                </Cell>
            ))}
        </Section>
    ) : undefined
}
