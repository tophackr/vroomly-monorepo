import type { JSX } from 'react'
import { memo } from 'react'
import type { InteractionTypeProps } from '@/entities/interaction'
import type { ParamsProps } from '@/shared/lib/dom'
import { BackButton } from '@/shared/ui/tma'
import { DynamicInteractionForm } from '../DynamicInteractionForm'

export const InteractionNewPage = memo(async function InteractionNewPage({
    params
}: ParamsProps<InteractionTypeProps>): Promise<JSX.Element> {
    const { type } = await params

    return (
        <BackButton>
            <DynamicInteractionForm type={type} />
        </BackButton>
    )
})
