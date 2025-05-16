import { FuelType, OdometerUnits } from '@vroomly/prisma'
import type { InferOutput } from 'valibot'
import {
    enum as _enum,
    boolean,
    nullable,
    object,
    optional,
    string
} from 'valibot'
import { userId } from '@/entities/user/@x/car'
import { baseSchema } from '@/shared/lib/store'
import {
    integerMinValue,
    integerMinValueOrNan,
    stringMinLength
} from '@/shared/lib/validation'

export { id as carId } from '@/shared/lib/store'

export const carReqSchema = object({
    isDefault: optional(boolean()),
    brand: string(),
    model: nullable(stringMinLength()),
    name: nullable(stringMinLength()),
    year: nullable(integerMinValueOrNan(1750)),
    fuelType: _enum(FuelType),
    fuelCapacity: nullable(integerMinValueOrNan()),
    mileage: integerMinValue(),
    odometerUnits: _enum(OdometerUnits),
    engineHoursEnabled: boolean(),
    engineHours: nullable(integerMinValueOrNan())
})

export const carResSchema = object({
    ...baseSchema.entries,
    ...carReqSchema.entries,
    isDefault: boolean(),
    userId
})

export type CarData = InferOutput<typeof carReqSchema>
