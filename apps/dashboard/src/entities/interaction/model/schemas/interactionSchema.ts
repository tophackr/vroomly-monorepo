import type {
    FuelInteraction,
    Interaction,
    PartOnInteraction,
    RepairOnInteraction,
    WheelInteraction
} from '@vroomly/prisma'
import { InteractionType } from '@vroomly/prisma'
import type { InferOutput } from 'valibot'
import {
    isoTimestamp,
    nullable,
    object,
    pipe,
    string,
    enum as _enum,
    transform,
    date,
    array
} from 'valibot'
import { carId } from '@/entities/car/@x/interaction'
import { userId } from '@/entities/user/@x/interaction'
import { baseSchema } from '@/shared/lib/store'
import {
    integerMinValue,
    integerMinValueOrNan,
    stringMinLength
} from '@/shared/lib/validation'
import type { FuelInteractionData } from './fuelInteractionSchema'
import { fuelInteractionResSchema } from './fuelInteractionSchema'
import type { PartInteractionData } from './partInteractionSchema'
import { partInteractionResSchema } from './partInteractionSchema'
import type { RepairInteractionData } from './repairInteractionSchema'
import { repairInteractionResSchema } from './repairInteractionSchema'
import type { WheelInteractionData } from './wheelInteractionSchema'
import { wheelInteractionResSchema } from './wheelInteractionSchema'

export const interactionReqSchema = object({
    type: _enum(InteractionType),
    date: date(),
    mileage: nullable(integerMinValueOrNan()),
    amount: nullable(integerMinValueOrNan()),
    engineHours: nullable(integerMinValue()),
    description: nullable(stringMinLength())
})

export const interactionResSchema = object({
    ...baseSchema.entries,
    ...interactionReqSchema.entries,
    date: pipe(
        string(),
        isoTimestamp(),
        transform(value => new Date(value))
    ),
    carId,
    userId
})

export const interactionFindResSchema = object({
    ...interactionResSchema.entries,
    fuelInteraction: nullable(fuelInteractionResSchema),
    repairInteractions: array(repairInteractionResSchema),
    partInteractions: array(partInteractionResSchema),
    wheelInteraction: nullable(wheelInteractionResSchema)
})

export type InteractionData = InferOutput<typeof interactionReqSchema>

export interface InteractionDataForm extends InteractionData {
    fuelData: FuelInteractionData | null
    repairData: RepairInteractionData | null
    partData: PartInteractionData | null
    wheelData: WheelInteractionData | null
}

export interface InteractionResData extends Interaction {
    fuelInteraction: FuelInteraction | null
    repairInteractions: RepairOnInteraction[]
    partInteractions: PartOnInteraction[]
    wheelInteraction: WheelInteraction | null
}
