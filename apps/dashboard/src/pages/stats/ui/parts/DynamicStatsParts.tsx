'use client'

import dynamic from 'next/dynamic'
import { PartsSkeleton } from './PartsSkeleton'

export const DynamicStatsParts = dynamic(
    () => import('./StatsParts').then(c => c.StatsParts),
    {
        loading: () => <PartsSkeleton />
    }
)
