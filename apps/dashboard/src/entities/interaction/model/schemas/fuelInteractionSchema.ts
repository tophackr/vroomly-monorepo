import { FuelGrade } from '@vroomly/prisma'
import type { InferOutput } from 'valibot'
import { enum as _enum, boolean, nullable, object } from 'valibot'
import { baseSchema, id } from '@/shared/lib/store'
import { floatMinValueOrNan } from '@/shared/lib/validation'

export const fuelInteractionReqSchema = object({
    fuelGrade: _enum(FuelGrade),
    capacity: nullable(floatMinValueOrNan()),
    price: nullable(floatMinValueOrNan()),
    beforeRefueling: nullable(floatMinValueOrNan()),
    afterRefueling: nullable(floatMinValueOrNan()),
    capacityFull: nullable(boolean())
})

export const fuelInteractionResSchema = object({
    ...baseSchema.entries,
    ...fuelInteractionReqSchema.entries,
    interactionId: id
})

export type FuelInteractionData = InferOutput<typeof fuelInteractionReqSchema>
