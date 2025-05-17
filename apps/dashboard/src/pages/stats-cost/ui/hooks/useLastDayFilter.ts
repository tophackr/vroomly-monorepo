import { useCallback, useMemo } from 'react'
import type { InteractionResData } from '@/entities/interaction'
import { oneDayInMs } from '@/shared/model'

interface UseLastDayFilterReturn {
    last30DaysFilter: (item: InteractionResData) => boolean
    last90DaysFilter: (item: InteractionResData) => boolean
    lastYearFilter: (item: InteractionResData) => boolean
}

export function useLastDayFilter(): UseLastDayFilterReturn {
    const now = useMemo(() => new Date(), [])
    const startDateLastYear = useMemo(() => {
        const date = new Date(now)
        date.setFullYear(now.getFullYear() - 1)
        date.setHours(0, 0, 0, 0)
        return date
    }, [now])
    const endDateLastYear = useMemo(() => {
        const date = new Date(now)
        date.setHours(0, 0, 0, 0)
        return date
    }, [now])

    const last30DaysFilter = useCallback(
        (item: InteractionResData) => {
            const itemDate = new Date(item.date)

            return (
                itemDate >= new Date(now.getTime() - 30 * oneDayInMs) &&
                itemDate <= now
            )
        },
        [now]
    )

    const last90DaysFilter = useCallback(
        (item: InteractionResData) => {
            const itemDate = new Date(item.date)

            return (
                itemDate >= new Date(now.getTime() - 90 * oneDayInMs) &&
                itemDate <= now
            )
        },
        [now]
    )

    const lastYearFilter = useCallback(
        (item: InteractionResData) => {
            const itemDate = new Date(item.date)

            return itemDate >= startDateLastYear && itemDate < endDateLastYear
        },
        [endDateLastYear, startDateLastYear]
    )

    return { last30DaysFilter, last90DaysFilter, lastYearFilter }
}
