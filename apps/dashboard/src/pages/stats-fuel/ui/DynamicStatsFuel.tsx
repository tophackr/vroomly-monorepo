'use client'

import dynamic from 'next/dynamic'
import { FuelSkeleton } from './FuelSkeleton'

export const DynamicStatsFuel = dynamic(
    () => import('./StatsFuel').then(c => c.StatsFuel),
    {
        loading: () => <FuelSkeleton />
    }
)
