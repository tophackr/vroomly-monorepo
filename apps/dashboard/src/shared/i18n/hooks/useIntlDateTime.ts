'use client'

import { useLocale } from 'use-intl'

export function useIntlDateTime(
    options?: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat {
    const locale = useLocale()

    return new Intl.DateTimeFormat(locale, options)
}
