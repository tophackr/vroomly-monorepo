import {
    type MinLengthAction,
    type SchemaWithPipe,
    type StringSchema,
    minLength,
    pipe,
    string
} from 'valibot'

export function stringMinLength(
    value: number = 1
): SchemaWithPipe<
    readonly [
        StringSchema<undefined>,
        MinLengthAction<string, number, undefined>
    ]
> {
    return pipe(string(), minLength(value))
}
