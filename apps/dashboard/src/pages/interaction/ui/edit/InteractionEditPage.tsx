'use client'

import type { JSX } from 'react'
import { memo, use } from 'react'
import type { InteractionTypeProps } from '@/entities/interaction'
import { useInteractionContext } from '@/entities/interaction'
import type { ParamsProps } from '@/shared/lib/dom'
import { BackButton } from '@/shared/ui/tma'
import { DynamicInteractionForm } from '../DynamicInteractionForm'

export const InteractionEditPage = memo(function InteractionEditPage({
    params
}: ParamsProps<InteractionTypeProps>): JSX.Element {
    const { type } = use(params)

    const { interaction } = useInteractionContext()

    return (
        <>
            <BackButton />

            <DynamicInteractionForm
                type={type}
                interaction={interaction}
            />
        </>
    )
})
