'use client'

import dynamic from 'next/dynamic'
import { InteractionFormSkeleton } from '@/entities/interaction'

export const DynamicInteractionPreview = dynamic(
    () =>
        import('@/widgets/integration-preview').then(c => c.InteractionPreview),
    {
        loading: () => <InteractionFormSkeleton />
    }
)
