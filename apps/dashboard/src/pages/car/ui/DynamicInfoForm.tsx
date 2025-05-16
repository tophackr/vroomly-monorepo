'use client'

import dynamic from 'next/dynamic'
import { InfoFormSkeleton } from '@/features/info-form'

export const DynamicInfoForm = dynamic(
    () => import('@/features/info-form').then(c => c.InfoForm),
    {
        loading: () => <InfoFormSkeleton />
    }
)
