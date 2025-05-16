import type { InferOutput } from 'valibot'
import { array, object } from 'valibot'
import { partId } from '@/entities/part/@x/interaction'
import { baseSchema, id } from '@/shared/lib/store'

export const partInteractionReqSchema = object({
    ids: array(partId)
})

const { createdAt, updatedAt } = baseSchema.entries

export const partInteractionResSchema = object({
    createdAt,
    updatedAt,
    interactionId: id,
    partId
})

export type PartInteractionData = InferOutput<typeof partInteractionReqSchema>
