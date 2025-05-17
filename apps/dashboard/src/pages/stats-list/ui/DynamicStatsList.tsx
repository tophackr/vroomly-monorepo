'use client'

import dynamic from 'next/dynamic'
import { ListSkeleton } from './ListSkeleton'

export const DynamicStatsList = dynamic(
    () => import('./StatsList').then(i => i.StatsList),
    {
        loading: () => <ListSkeleton />
    }
)
