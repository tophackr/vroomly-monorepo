import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { InteractionCategory } from '@vroomly/prisma'
import { useIntlCurrency } from '@/shared/i18n'
import { reduceSumItems } from '@/shared/lib/number'
import type { InteractionsProps } from '../model/props'

export function InteractionSumFooter({
    interactions
}: InteractionsProps): string {
    const t = useTranslations('Stats')

    const filteredInteractions = useMemo(
        () =>
            [...interactions].filter(
                inter => inter.type !== InteractionCategory.mileage
            ),
        [interactions]
    )
    const sumAmount = reduceSumItems(filteredInteractions, 'amount')

    const currency = useIntlCurrency().format(sumAmount)

    return `${t('total')}: ${currency}`
}
