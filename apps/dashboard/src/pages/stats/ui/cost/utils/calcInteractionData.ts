import type { InteractionType } from '@vroomly/prisma'
import type { InteractionResData } from '@/entities/interaction'
import { typedEntries } from '@/shared/lib/dom'
import type { InteractionDataProps } from '../types'

export function calcInteractionData(
    interactions: InteractionResData[]
): InteractionDataProps {
    const typeCount: Partial<Record<InteractionType, number>> = {}
    let totalCount = 0

    for (const item of interactions) {
        typeCount[item.type] = (typeCount[item.type] || 0) + (item.amount ?? 0)
        totalCount += item.amount ?? 0
    }

    const data = typedEntries(typeCount).sort(
        ([, valueA], [, valueB]) => valueB - valueA
    )

    return { totalCount, data }
}
