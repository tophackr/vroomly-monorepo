import { RimType, TireType, WheelType } from '@vroomly/prisma'
import type { InferOutput } from 'valibot'
import {
    enum as _enum,
    minValue,
    nullable,
    number,
    object,
    pipe
} from 'valibot'
import { baseSchema, id } from '@/shared/lib/store'
import { integerMinValue, stringMinLength } from '@/shared/lib/validation'

export const wheelInteractionReqSchema = object({
    wheelType: _enum(WheelType),
    tireType: nullable(_enum(TireType)),
    rimType: nullable(_enum(RimType)),
    brand: nullable(stringMinLength()),
    model: nullable(stringMinLength()),
    width: nullable(pipe(number(), minValue(0))),
    height: nullable(integerMinValue()),
    diameter: nullable(integerMinValue())
})

export const wheelInteractionResSchema = object({
    ...baseSchema.entries,
    ...wheelInteractionReqSchema.entries,
    interactionId: id
})

export type WheelInteractionData = InferOutput<typeof wheelInteractionReqSchema>
