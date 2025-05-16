'use client'

import dynamic from 'next/dynamic'
import { SegmentsSkeleton } from '@/features/segment'
import { CarPreviewSkeleton } from '@/entities/car'

export const DynamicSegments = dynamic(
    () => import('@/features/segment').then(i => i.Segments),
    {
        loading: () => <CarPreviewSkeleton segments={<SegmentsSkeleton />} />
    }
)
