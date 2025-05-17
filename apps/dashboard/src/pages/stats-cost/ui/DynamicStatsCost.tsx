'use client'

import dynamic from 'next/dynamic'
import { CostSkeleton } from './CostSkeleton'

export const DynamicStatsCost = dynamic(
    () => import('./StatsCost').then(i => i.StatsCost),
    {
        loading: () => <CostSkeleton />
    }
)
