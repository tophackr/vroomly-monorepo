import { lazy, Suspense } from 'react'
import { BackButton } from '@/shared/ui/tma'
import { RepairsEditSkeleton } from './RepairsEditSkeleton'

const StatsRepairsEdit = lazy(() =>
    import('./StatsRepairsEdit').then(m => ({ default: m.StatsRepairsEdit }))
)

export function StatsRepairsEditPage() {
    return (
        <BackButton>
            <Suspense fallback={<RepairsEditSkeleton />}>
                <StatsRepairsEdit />
            </Suspense>
        </BackButton>
    )
}
