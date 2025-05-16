import { Language } from '@vroomly/prisma'
import type { InferInput } from 'valibot'
import { enum as _enum, minLength, object, pipe, string } from 'valibot'
import { baseSchema } from '@/shared/lib/store'

export const userId = pipe(string(), minLength(1))

export const userReqSchema = object({
    language: _enum(Language),
    timezone: string()
})

export const userResSchema = object({
    ...baseSchema.entries,
    ...userReqSchema.entries,
    id: userId
})

export type UserData = InferInput<typeof userReqSchema>
