import {
    type MinValueAction,
    type NumberSchema,
    type SchemaWithPipe,
    type TransformAction,
    minValue,
    number,
    pipe,
    transform
} from 'valibot'
import { toFixedNumber } from '../number'

export function floatMinValue(
    fixed: number = 2,
    value: number = 0
): SchemaWithPipe<
    readonly [
        NumberSchema<undefined>,
        TransformAction<number, number>,
        MinValueAction<number, number, undefined>
    ]
> {
    return pipe(
        number(),
        transform(value => toFixedNumber(value, fixed)),
        minValue(value)
    )
}
