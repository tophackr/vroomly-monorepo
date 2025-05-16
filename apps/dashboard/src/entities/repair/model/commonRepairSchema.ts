import type { Interaction, Repair } from '@vroomly/prisma'
import { nullable, object } from 'valibot'
import { interactionResSchema } from '@/entities/interaction/@x/repair'
import { repairResSchema } from './repairSchema'

export const commonRepairResSchema = object({
    ...repairResSchema.entries,
    interaction: nullable(interactionResSchema)
})

export interface CommonRepairResData extends Repair {
    interaction: Interaction | null
}
