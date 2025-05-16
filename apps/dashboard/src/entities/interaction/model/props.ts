import type { InteractionCategory } from '@vroomly/prisma'
import type { InteractionResData } from './schemas/interactionSchema'

export interface CategoryProps {
    category: InteractionCategory
}

export interface InteractionIdProps {
    interactionId: string
}

export interface InteractionProps {
    interaction: InteractionResData
}

export interface InteractionsProps {
    interactions: InteractionResData[]
}
