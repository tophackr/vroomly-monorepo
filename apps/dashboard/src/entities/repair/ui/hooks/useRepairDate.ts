import { useIntlUnit } from '@/shared/i18n'
import { getPercent } from '@/shared/lib/number'

interface UseRepairDateReturn {
    days?: string
    percent: number
}

export function useRepairDate(
    days?: number | null,
    date?: Date
): UseRepairDateReturn {
    const intlUnit = useIntlUnit('day')

    if (!days || !date) {
        return {
            percent: 0
        }
    }

    const currentDate = new Date()

    const timeDiff = currentDate.getTime() - date.getTime()
    const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    const nextReplacementDays = days - diffInDays
    const nextReplacementDaysOrZero = nextReplacementDays ?? 0
    const nextReplacementDaysFixed = Math.min(days, nextReplacementDaysOrZero)

    const nextDays = intlUnit.format(nextReplacementDaysFixed)
    const daysPercent = getPercent(
        nextReplacementDaysFixed ? days - nextReplacementDaysFixed : 0,
        days
    )

    return { days: nextDays, percent: daysPercent }
}
