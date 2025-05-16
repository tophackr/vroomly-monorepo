'use client'

import dynamic from 'next/dynamic'
import { CarsContentLoading } from './CarsContentLoading'

export const DynamicCarsContent = dynamic(
    () => import('./CarsContent').then(c => c.CarsContent),
    {
        loading: () => <CarsContentLoading />
    }
)
