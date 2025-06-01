'use client'

import { useLocale } from 'use-intl'

export function useIntlNumber(
    options?: Intl.NumberFormatOptions
): Intl.NumberFormat {
    const locale = useLocale()

    return new Intl.NumberFormat(locale, options)
}
