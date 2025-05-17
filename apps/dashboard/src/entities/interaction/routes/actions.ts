import type { InteractionType } from '@vroomly/prisma'
import { pagesRoute } from '@/shared/routes'

const rootRoute = (carId: string) => pagesRoute.carId(carId)

export const actionsRoute = (carId: string) => {
    const typeRoute = (type: InteractionType) => `${rootRoute(carId)}/${type}`

    return {
        type: typeRoute,
        new: (type: InteractionType) => `${typeRoute(type)}/new`,
        details: (type: InteractionType, id: string) =>
            `${typeRoute(type)}/${id}`,
        edit: (type: InteractionType, id: string) =>
            `${typeRoute(type)}/${id}/edit`
    }
}
