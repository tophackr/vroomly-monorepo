import { RepairOption } from '@vroomly/prisma'
import {
    type InferOutput,
    enum as _enum,
    array,
    boolean,
    nullable,
    object,
    optional,
    string,
    union
} from 'valibot'
import { carId } from '@/entities/car/@x/repair'
import { userId } from '@/entities/user/@x/repair'
import { baseSchema } from '@/shared/lib/store'
import { integerMinValue } from '@/shared/lib/validation'

export { id as repairId } from '@/shared/lib/store'

const option = union([_enum(RepairOption), string()])

export const repairReqSchema = object({
    option: optional(option),
    mileage: nullable(integerMinValue()),
    days: nullable(integerMinValue()),
    isVisible: boolean()
})

export const repairManyReqSchema = object({
    repairs: array(repairReqSchema)
})

export const repairResSchema = object({
    ...baseSchema.entries,
    ...repairReqSchema.entries,
    isDefault: boolean(),
    option,
    carId,
    userId
})

export type RepairReqData = InferOutput<typeof repairReqSchema>

export type RepairManyReqData = InferOutput<typeof repairManyReqSchema>
