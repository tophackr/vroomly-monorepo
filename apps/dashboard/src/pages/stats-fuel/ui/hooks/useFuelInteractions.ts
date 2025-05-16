import { useMemo } from 'react'
import { InteractionCategory } from '@vroomly/prisma'
import { useCarContext } from '@/entities/car'
import type { InteractionResData } from '@/entities/interaction'
import { useFindAllInteractionsQuery } from '@/entities/interaction'
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
        () =>
            (interactions ?? []).filter(
                interaction => interaction.type === InteractionCategory.fuel
            ),
        [interactions]
    )
}
