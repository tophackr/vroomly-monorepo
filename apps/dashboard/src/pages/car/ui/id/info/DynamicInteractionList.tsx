'use client'

import dynamic from 'next/dynamic'

export const DynamicInteractionList = dynamic(() =>
    import('@/entities/interaction').then(mod => mod.InteractionList)
)
