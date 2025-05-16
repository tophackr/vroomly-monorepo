import { PartOption } from '@vroomly/prisma'

export function isPart(value: string): value is PartOption {
    const partOptions = Object.values(PartOption)
    return (partOptions as readonly string[]).includes(value)
}
