import type { InteractionType } from '@vroomly/prisma'

export interface TotalCountProps {
    totalCount: number
}
interface DataProps {
    data: [InteractionType, number][]
}

export type InteractionDataProps = TotalCountProps & DataProps
