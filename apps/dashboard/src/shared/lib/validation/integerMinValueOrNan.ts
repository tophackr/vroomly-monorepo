import {
    type IntegerAction,
    type MinValueAction,
    type NanSchema,
    type NumberSchema,
    type SchemaWithPipe,
    type UnionSchema,
    nan,
    union
} from 'valibot'
import { integerMinValue } from './integerMinValue'

export function integerMinValueOrNan(
    value: number = 0
): UnionSchema<
    [
        SchemaWithPipe<
            readonly [
                NumberSchema<undefined>,
                IntegerAction<number, undefined>,
                MinValueAction<number, number, undefined>
            ]
        >,
        NanSchema<undefined>
    ],
    undefined
> {
    return union([integerMinValue(value), nan()])
}
