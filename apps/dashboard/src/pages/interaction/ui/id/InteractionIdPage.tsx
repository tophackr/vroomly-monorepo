import { lazy, Suspense } from 'react'
import { useParams } from 'react-router'
import type { InteractionType } from '@vroomly/prisma'
import { InteractionFormSkeleton } from '@/entities/interaction'
import { BackButton } from '@/shared/ui/tma'

const InteractionPreview = lazy(() =>
    import('@/widgets/integration-preview').then(m => ({
        default: m.InteractionPreview
    }))
)

export function InteractionIdPage() {
    const { type } = useParams<{ type: InteractionType }>()

    if (!type) {
        throw new Error('InteractionIdPage requires a type parameter.')
    }

    return (
        <BackButton>
            <Suspense fallback={<InteractionFormSkeleton />}>
                <InteractionPreview type={type} />
            </Suspense>
        </BackButton>
    )
}
