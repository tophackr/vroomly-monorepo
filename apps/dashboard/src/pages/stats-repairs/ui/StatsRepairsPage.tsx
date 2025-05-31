import { lazy, Suspense } from 'react'
import { RepairsSkeleton } from './RepairsSkeleton'

const StatsRepairs = lazy(() =>
    import('./StatsRepairs').then(m => ({ default: m.StatsRepairs }))
)

export function StatsRepairsPage() {
    return (
        <Suspense fallback={<RepairsSkeleton />}>
            <StatsRepairs />
        </Suspense>
    )
}
