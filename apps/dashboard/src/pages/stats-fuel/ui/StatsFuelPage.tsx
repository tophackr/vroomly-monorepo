import { lazy, Suspense } from 'react'
import { FuelSkeleton } from './FuelSkeleton'

const StatsFuel = lazy(() =>
    import('./StatsFuel').then(m => ({ default: m.StatsFuel }))
)

export function StatsFuelPage() {
    return (
        <Suspense fallback={<FuelSkeleton />}>
            <StatsFuel />
        </Suspense>
    )
}
