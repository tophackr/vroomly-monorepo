'use client'

import { useTranslations } from 'use-intl'
import { useIntlNumber } from './useIntlNumber'

export function useIntlCurrency(): Intl.NumberFormat {
    const t = useTranslations('Locale')

    return useIntlNumber({
        style: 'currency',
        currency: t('currency')
    })
}
