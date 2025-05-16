import type { JSX } from 'react'
import { memo } from 'react'
import type { CategoryProps } from '@/entities/interaction'
import type { ParamsProps } from '@/shared/lib/dom'
import { BackButton } from '@/shared/ui/tma'
import { DynamicInteractionForm } from '../DynamicInteractionForm'

export const InteractionNewPage = memo(async function InteractionNewPage({
    params
}: ParamsProps<CategoryProps>): Promise<JSX.Element> {
    const { category } = await params

    return (
        <>
            <BackButton />

            <DynamicInteractionForm category={category} />
        </>
    )
})
