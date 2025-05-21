import { useLocale } from '@/shared/lib/store'

export function useIntlNumber(
    options?: Intl.NumberFormatOptions
): Intl.NumberFormat {
    const { locale } = useLocale()

    return new Intl.NumberFormat(locale, options)
}
