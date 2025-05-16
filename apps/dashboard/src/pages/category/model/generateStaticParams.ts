import { InteractionCategory } from '@vroomly/prisma'
import type { CategoryProps } from '@/entities/interaction'

export function generateStaticParams(): CategoryProps[] {
    return Object.values(InteractionCategory).map(category => ({ category }))
}
