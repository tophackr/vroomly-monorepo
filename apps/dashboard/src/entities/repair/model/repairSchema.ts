import { RepairOption } from '@vroomly/prisma'
import {
    type InferOutput,
    enum as _enum,
    boolean,
    nullable,
    object,
    string,
    union
} from 'valibot'
import { carId } from '@/entities/car/@x/repair'
import { userId } from '@/entities/user/@x/repair'
import { baseSchema } from '@/shared/lib/store'
import { integerMinValue } from '@/shared/lib/validation'

export { id as repairId } from '@/shared/lib/store'

export const repairReqSchema = object({
    option: union([_enum(RepairOption), string()]),
    mileage: nullable(integerMinValue()),
    days: nullable(integerMinValue()),
    isVisible: boolean()
})

export const repairResSchema = object({
    ...baseSchema.entries,
    ...repairReqSchema.entries,
    isDefault: boolean(),
    carId,
    userId
})

export type RepairReqData = InferOutput<typeof repairReqSchema>
