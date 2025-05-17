'use client'

import dynamic from 'next/dynamic'
import { RepairsSkeleton } from './RepairsSkeleton'

export const DynamicStatsRepairs = dynamic(
    () => import('./StatsRepairs').then(c => c.StatsRepairs),
    {
        loading: () => <RepairsSkeleton />
    }
)
