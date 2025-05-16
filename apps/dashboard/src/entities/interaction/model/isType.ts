import { InteractionCategory } from '@vroomly/prisma'

const repairTypes: Set<InteractionCategory> = new Set([
    InteractionCategory.maintenance,
    InteractionCategory.repair
])

export function isFuelType(value: InteractionCategory): boolean {
    return value === InteractionCategory.fuel
}

export function isRepairType(value: InteractionCategory): boolean {
    return repairTypes.has(value)
}

export function isPartType(value: InteractionCategory): boolean {
    return value === InteractionCategory.part
}

export function isWheelType(value: InteractionCategory): boolean {
    return value === InteractionCategory.purchase_wheels
}
