import { lazy, Suspense } from 'react'
import { BackButton } from '@/shared/ui/tma'
import { CostSkeleton } from './CostSkeleton'

const StatsCost = lazy(() =>
    import('./StatsCost').then(m => ({ default: m.StatsCost }))
)

export function StatsCostPage() {
    return (
        <BackButton>
            <Suspense fallback={<CostSkeleton />}>
                <StatsCost />
            </Suspense>
        </BackButton>
    )
}
