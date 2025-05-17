import { InteractionType } from '@vroomly/prisma'
import type { InteractionTypeProps } from '@/entities/interaction'

export function generateStaticParams(): InteractionTypeProps[] {
    return Object.values(InteractionType).map(type => ({ type }))
}
