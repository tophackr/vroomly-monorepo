import type { JSX } from 'react'
import { memo } from 'react'
import type { CategoryProps } from '@/entities/interaction'
import type { ParamsProps } from '@/shared/lib/dom'
import { BackButton } from '@/shared/ui/tma'
import { DynamicInteractionPreview } from './DynamicInteractionPreview'

export const InteractionIdPage = memo(async function InteractionIdPage({
    params
}: ParamsProps<CategoryProps>): Promise<JSX.Element> {
    const { category } = await params

    return (
        <>
            <BackButton />

            <DynamicInteractionPreview category={category} />
        </>
    )
})
