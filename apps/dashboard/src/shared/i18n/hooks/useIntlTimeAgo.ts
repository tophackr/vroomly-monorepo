import { useLocale } from 'next-intl'
import { daysAfterToday } from '@/shared/lib/date'
import { useIntlDateTime } from './useIntlDateTime'

export function useIntlTimeAgo(value: Date): string {
    const locale = useLocale()
    const dateTime = useIntlDateTime()

    const diffInDays = daysAfterToday(value) + 1

    if (diffInDays >= -1 && diffInDays <= 1) {
        return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(
            diffInDays,
            'day'
        )
    }

    return dateTime.format(value)
}
