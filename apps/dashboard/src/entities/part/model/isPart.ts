import type { PartOption } from '@vroomly/prisma'

// todo: this is a temporary solution that needs to be fixed.
// enum does not return values, although the other one works correctly.
const partOptions: PartOption[] = [
    'oil',
    'filter',
    'brake_pads_and_discs',
    'coolant',
    'windshield_washer',
    'spark_plugs'
]

export function isPart(value: string): value is PartOption {
    return (partOptions as readonly string[]).includes(value)
}
