import { lazy, Suspense } from 'react'
import { useParams } from 'react-router'
import type { InteractionType } from '@vroomly/prisma'
import { InteractionFormSkeleton } from '@/entities/interaction'
import { BackButton } from '@/shared/ui/tma'

const InteractionForm = lazy(() =>
    import('@/features/interaction-form').then(m => ({
        default: m.InteractionForm
    }))
)

export function InteractionNewPage() {
    const { type } = useParams<{ type: InteractionType }>()

    if (!type) {
        throw new Error('InteractionNewPage requires a type parameter.')
    }

    return (
        <BackButton>
            <Suspense fallback={<InteractionFormSkeleton />}>
                <InteractionForm type={type} />
            </Suspense>
        </BackButton>
    )
}
