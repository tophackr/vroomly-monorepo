import { useMemo } from 'react'
import { useLogger } from '@/shared/model'
import { useFindAllInteractionsQuery } from '../../api/interaction.api'
import type { InteractionResData } from '../../model/schemas/interactionSchema'

interface GroupedInteractions {
    [month: string]: InteractionResData[]
}

export function useListInteractions(
    carId: string,
    slice?: number
): GroupedInteractions | InteractionResData[] {
    const { error: logError } = useLogger()

    const {
        data: interactions,
        isLoading,
        isError,
        error
    } = useFindAllInteractionsQuery({ carId })

    if (isError) logError('useListInteractions', error)

    return useMemo(() => {
        if (isLoading || !interactions) return []

        return slice
            ? interactions.slice(0, slice)
            : (() => {
                  const grouped: GroupedInteractions = {}

                  for (const item of interactions) {
                      const date = new Date(item.date)
                      const monthKey = `${date.getFullYear()}-${(
                          date.getMonth() + 1
                      )
                          .toString()
                          .padStart(2, '0')}`

                      if (!grouped[monthKey]) {
                          grouped[monthKey] = []
                      }

                      grouped[monthKey].push(item)
                  }

                  return grouped
              })()
    }, [interactions, isLoading, slice])
}
