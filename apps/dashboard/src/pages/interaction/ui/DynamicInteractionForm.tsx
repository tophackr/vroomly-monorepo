'use client'

import dynamic from 'next/dynamic'
import { InteractionFormSkeleton } from '@/entities/interaction'

export const DynamicInteractionForm = dynamic(
    () => import('@/features/interaction-form').then(c => c.InteractionForm),
    {
        loading: () => <InteractionFormSkeleton />
    }
)
