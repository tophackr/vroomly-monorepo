'use client'

import dynamic from 'next/dynamic'
import { RepairsEditSkeleton } from './RepairsEditSkeleton'

export const DynamicStatsRepairsEdit = dynamic(
    () => import('./StatsRepairsEdit').then(c => c.StatsRepairsEdit),
    {
        loading: () => <RepairsEditSkeleton />
    }
)
