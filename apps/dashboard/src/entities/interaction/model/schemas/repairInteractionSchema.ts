import type { InferOutput } from 'valibot'
import { array, object } from 'valibot'
import { repairId } from '@/entities/repair/@x/interaction'
import { baseSchema, id } from '@/shared/lib/store'

export const repairInteractionReqSchema = object({
    ids: array(repairId)
})

const { createdAt, updatedAt } = baseSchema.entries

export const repairInteractionResSchema = object({
    createdAt,
    updatedAt,
    interactionId: id,
    repairId
})

export type RepairInteractionData = InferOutput<
    typeof repairInteractionReqSchema
>
