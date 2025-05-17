import { InteractionType } from '@vroomly/prisma'

const repairTypes: Set<InteractionType> = new Set([
    InteractionType.maintenance,
    InteractionType.repair
])

export function isMileageType(value: InteractionType): boolean {
    return value === InteractionType.mileage
}

export function isFuelType(value: InteractionType): boolean {
    return value === InteractionType.fuel
}

export function isRepairType(value: InteractionType): boolean {
    return repairTypes.has(value)
}

export function isPartType(value: InteractionType): boolean {
    return value === InteractionType.part
}

export function isWheelType(value: InteractionType): boolean {
    return value === InteractionType.purchase_wheels
}
