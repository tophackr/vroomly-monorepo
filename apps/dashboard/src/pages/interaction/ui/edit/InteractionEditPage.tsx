import type { JSX } from 'react'
import { lazy, Suspense } from 'react'
import { useParams } from 'react-router'
import type { InteractionType } from '@vroomly/prisma'
import {
    InteractionFormSkeleton,
    useInteractionContext
} from '@/entities/interaction'
import { BackButton } from '@/shared/ui/tma'

const InteractionForm = lazy(() =>
    import('@/features/interaction-form').then(m => ({
        default: m.InteractionForm
    }))
)

export function InteractionEditPage(): JSX.Element {
    const { type } = useParams<{ type: InteractionType }>()

    const { interaction } = useInteractionContext()

    if (!type) {
        throw new Error('InteractionEditPage requires a type parameter.')
    }

    return (
        <BackButton>
            <Suspense fallback={<InteractionFormSkeleton />}>
                <InteractionForm
                    type={type}
                    interaction={interaction}
                />
            </Suspense>
        </BackButton>
    )
}
