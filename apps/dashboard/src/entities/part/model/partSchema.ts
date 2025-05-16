import { PartOption } from '@vroomly/prisma'
import {
    type InferOutput,
    enum as _enum,
    boolean,
    object,
    string,
    union
} from 'valibot'
import { carId } from '@/entities/car/@x/part'
import { userId } from '@/entities/user/@x/part'
import { baseSchema } from '@/shared/lib/store'

export { id as partId } from '@/shared/lib/store'

export const partReqSchema = object({
    option: union([_enum(PartOption), string()]),
    isVisible: boolean()
})

export const partResSchema = object({
    ...baseSchema.entries,
    ...partReqSchema.entries,
    isDefault: boolean(),
    carId,
    userId
})

export type PartData = InferOutput<typeof partReqSchema>
