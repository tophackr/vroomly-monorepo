import { lazy, Suspense } from 'react'
import { BackButton } from '@/shared/ui/tma'
import { ListSkeleton } from './ListSkeleton'

const StatsList = lazy(() =>
    import('./StatsList').then(m => ({ default: m.StatsList }))
)

export function StatsListPage() {
    return (
        <BackButton>
            <Suspense fallback={<ListSkeleton />}>
                <StatsList />
            </Suspense>
        </BackButton>
    )
}
