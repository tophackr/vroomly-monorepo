'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { Cell, Section } from '@telegram-apps/telegram-ui'
import { PartOption } from '@vroomly/prisma'
import { useInteractionContext } from '@/entities/interaction'
import { useFindAllPartsQuery } from '@/entities/part'
import { useLogger } from '@/shared/model'

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

    const partOptions = useMemo(() => Object.values(PartOption), [])
    const ids = useMemo(
        () => partInteractions?.map(part => part.partId),
        [partInteractions]
    )
    const partsListFiltered = useMemo(
        () => data?.filter(data => ids.includes(data.id)),
        [data, ids]
    )

    // todo: loading parts
    if (isLoading) return <>Loading parts...</>

    return partsListFiltered?.length ? (
        <Section header={t('parts_work.title')}>
            {partsListFiltered?.map(({ id, option }) => (
                <Cell key={id}>
                    {partOptions.includes(option as PartOption)
                        ? t(`parts_work.options.${option as PartOption}`)
                        : option}
                </Cell>
            ))}
        </Section>
    ) : undefined
}
