import type { InteractionCategory } from '@vroomly/prisma'
import { pagesRoute } from '@/shared/routes'

const rootRoute = (carId: string) => pagesRoute.carId(carId)

export const actionsRoute = (carId: string) => {
    const categoryRoute = (category: InteractionCategory) =>
        `${rootRoute(carId)}/${category}`

    return {
        category: categoryRoute,
        new: (category: InteractionCategory) =>
            `${categoryRoute(category)}/new`,
        details: (category: InteractionCategory, id: string) =>
            `${categoryRoute(category)}/${id}`,
        edit: (category: InteractionCategory, id: string) =>
            `${categoryRoute(category)}/${id}/edit`
    }
}
