import { RepairOption } from '@vroomly/prisma'

export function isRepair(value: string): value is RepairOption {
    const repairOptions = Object.values(RepairOption)
    return (repairOptions as readonly string[]).includes(value)
}
