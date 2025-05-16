import { useMemo } from 'react'
import { useCarContext } from '@/entities/car'
import type { InteractionResData } from '@/entities/interaction'
import { isFuelType, useFindAllInteractionsQuery } from '@/entities/interaction'
import { useLogger } from '@/shared/model'

export function useFuelInteractions(): InteractionResData[] {
    const { error: logError } = useLogger()

    const { car } = useCarContext()
    const {
        data: interactions,
        isError,
        error
    } = useFindAllInteractionsQuery({
        carId: car.id
    })

    if (isError) logError('useFuelInteractions', error)

    return useMemo(
        () => (interactions ?? []).filter(({ type }) => isFuelType(type)),
        [interactions]
    )
}
