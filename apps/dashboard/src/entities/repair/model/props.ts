import type { Repair } from '@vroomly/prisma'
import type { CommonRepairResData } from './commonRepairSchema'

export interface RepairIdProps {
    repairId: string
}

export interface RepairProps {
    repair: Repair
}

export interface CommonRepairProps {
    commonRepair: CommonRepairResData
}

export interface RepairsProps {
    repairs: Repair[]
}
