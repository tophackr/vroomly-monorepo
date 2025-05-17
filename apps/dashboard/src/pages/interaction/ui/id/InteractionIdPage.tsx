import type { JSX } from 'react'
import { memo } from 'react'
import type { InteractionTypeProps } from '@/entities/interaction'
import type { ParamsProps } from '@/shared/lib/dom'
import { BackButton } from '@/shared/ui/tma'
import { DynamicInteractionPreview } from './DynamicInteractionPreview'

export const InteractionIdPage = memo(async function InteractionIdPage({
    params
}: ParamsProps<InteractionTypeProps>): Promise<JSX.Element> {
    const { type } = await params

    return (
        <>
            <BackButton />

            <DynamicInteractionPreview type={type} />
        </>
    )
})
