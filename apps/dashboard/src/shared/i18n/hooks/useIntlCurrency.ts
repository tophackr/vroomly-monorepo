'use client'

import { useTranslations } from 'next-intl'
import { useIntlNumber } from './useIntlNumber'

export function useIntlCurrency(): Intl.NumberFormat {
    const t = useTranslations('Locale')

    return useIntlNumber({
        style: 'currency',
        currency: t('currency')
    })
}
