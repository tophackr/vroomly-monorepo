import { useLocale } from '@/shared/lib/store'

export function useIntlDateTime(
    options?: Intl.DateTimeFormatOptions
): Intl.DateTimeFormat {
    const { locale } = useLocale()

    return new Intl.DateTimeFormat(locale, options)
}
