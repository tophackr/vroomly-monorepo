import { useLocale } from 'next-intl'

export function useIntlNumber(
    options?: Intl.NumberFormatOptions
): Intl.NumberFormat {
    const locale = useLocale()

    return new Intl.NumberFormat(locale, options)
}
