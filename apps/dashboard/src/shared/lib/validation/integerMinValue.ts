import {
    type IntegerAction,
    type MinValueAction,
    type NumberSchema,
    type SchemaWithPipe,
    integer,
    minValue,
    number,
    pipe
} from 'valibot'

export function integerMinValue(
    value: number = 0
): SchemaWithPipe<
    readonly [
        NumberSchema<undefined>,
        IntegerAction<number, undefined>,
        MinValueAction<number, number, undefined>
    ]
> {
    return pipe(number(), integer(), minValue(value))
}
