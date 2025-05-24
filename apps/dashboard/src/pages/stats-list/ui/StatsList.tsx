'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { LargeTitle, List, Placeholder } from '@telegram-apps/telegram-ui'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import {
    InteractionList,
    isMileageType,
    useFindAllInteractionsQuery
} from '@/entities/interaction'
import { useIntlCurrency } from '@/shared/i18n'
import { reduceSumItems } from '@/shared/lib/number'
import { useLogger } from '@/shared/model'
import { BackButton } from '@/shared/ui/tma'
import { ListSkeleton } from './ListSkeleton'

export function StatsList(): JSX.Element {
    const t = useTranslations('StatsCategoryName')
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

    if (isError) logError('StatsList', error)

    const filteredInteractions = useMemo(
        () =>
            [...(interactions ?? [])].filter(
                ({ type }) => !isMileageType(type)
            ),
        [interactions]
    )

    const sumAmount = reduceSumItems(filteredInteractions, 'amount')

    const currency = useIntlCurrency().format(sumAmount)

    if (isLoading) return <ListSkeleton />

    return (
        <List>
            <BackButton />

            <Placeholder description={t('list')}>
                <LargeTitle>{currency}</LargeTitle>
            </Placeholder>

            <InteractionList car={car} />
        </List>
    )
}
