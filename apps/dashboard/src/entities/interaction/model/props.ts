import type { InteractionType } from '@vroomly/prisma'
import type { InteractionResData } from './schemas/interactionSchema'

export interface InteractionTypeProps {
    type: InteractionType
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
