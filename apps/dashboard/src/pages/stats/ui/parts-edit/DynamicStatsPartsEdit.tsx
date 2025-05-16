'use client'

import dynamic from 'next/dynamic'
import { PartsEditSkeleton } from './PartsEditSkeleton'

export const DynamicStatsPartsEdit = dynamic(
    () => import('./StatsPartsEdit').then(c => c.StatsPartsEdit),
    {
        loading: () => <PartsEditSkeleton />
    }
)
