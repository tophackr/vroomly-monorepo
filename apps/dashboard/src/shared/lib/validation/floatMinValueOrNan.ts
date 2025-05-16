import {
    type MinValueAction,
    type NanSchema,
    type NumberSchema,
    type SchemaWithPipe,
    type TransformAction,
    type UnionSchema,
    nan,
    union
} from 'valibot'
import { floatMinValue } from './floatMinValue'

export function floatMinValueOrNan(
    fixed: number = 2,
    value: number = 0
): UnionSchema<
    [
        SchemaWithPipe<
            readonly [
                NumberSchema<undefined>,
                TransformAction<number, number>,
                MinValueAction<number, number, undefined>
            ]
        >,
        NanSchema<undefined>
    ],
    undefined
> {
    return union([floatMinValue(fixed, value), nan()])
}
