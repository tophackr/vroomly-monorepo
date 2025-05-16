import { RepairOption } from '@vroomly/prisma'

const repairOptions = Object.values(RepairOption)

export function isRepair(value: string): value is RepairOption {
    return (repairOptions as readonly string[]).includes(value)
}
