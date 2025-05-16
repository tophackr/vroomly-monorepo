import { Prisma } from '@vroomly/prisma'

class EntityNotFoundException extends Error {
    constructor(entity: string) {
        super(`Entity "${entity}" not found in Prisma schema`)
        this.name = 'EntityNotFoundException'
    }
}

type EntityName =
    | 'User'
    | 'Car'
    | 'Repair'
    | 'Part'
    | 'Interaction'
    | 'FuelInteraction'
    | 'WheelInteraction'

export function allowedFieldsDto<T extends object>(
    dto: T,
    entity: EntityName
): T {
    const model = Prisma.ModelName[entity]

    if (!model) {
        throw new EntityNotFoundException(entity)
    }

    const allowedFields = new Set(
        Object.values(Prisma[`${entity}ScalarFieldEnum`]).map(String)
    )

    return Object.fromEntries(
        Object.entries(dto).filter(([key]) => allowedFields.has(key))
    ) as T
}
