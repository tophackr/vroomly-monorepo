import type { InteractionType } from '@vroomly/prisma'

export enum CostKeys {
    thirty_days = '30_days',
    ninety_days = '90_days',
    one_year = '1_year',
    all_time = 'all_time'
}

export interface TotalCountProps {
    totalCount: number
}

interface DataProps {
    data: [InteractionType, number][]
}

export type InteractionDataProps = TotalCountProps & DataProps
