import { Language } from '@vroomly/prisma'
import type { InferInput } from 'valibot'
import {
    enum as _enum,
    minLength,
    object,
    optional,
    pipe,
    string
} from 'valibot'
import { baseSchema } from '@/shared/lib/store'

export const userId = pipe(string(), minLength(1))

const language = _enum(Language)
const timezone = string()

export const userReqSchema = object({
    language: optional(language),
    timezone: optional(language)
})

export const userResSchema = object({
    ...baseSchema.entries,
    language,
    timezone,
    id: userId
})

export type UserData = InferInput<typeof userReqSchema>
