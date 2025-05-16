import type { Part } from '@vroomly/prisma'
import { PartOption } from '@vroomly/prisma'

type IPart = Pick<Part, 'option' | 'isDefault' | 'isVisible'>

export const defaultPart: IPart[] = Object.values(PartOption).map(part => ({
    option: part,
    isDefault: true,
    isVisible: true
}))
