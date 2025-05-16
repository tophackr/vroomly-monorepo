import {
    type InferOutput,
    cuid2,
    isoTimestamp,
    length,
    object,
    pipe,
    string,
    transform
} from 'valibot'

export const id = pipe(string(), cuid2(), length(25))

export const baseSchema = object({
    id,
    createdAt: pipe(
        string(),
        isoTimestamp(),
        transform(value => new Date(value))
    ),
    updatedAt: pipe(
        string(),
        isoTimestamp(),
        transform(value => new Date(value))
    )
})

export type BaseData = InferOutput<typeof baseSchema>
