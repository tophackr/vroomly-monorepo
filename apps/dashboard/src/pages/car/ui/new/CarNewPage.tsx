import type { JSX } from 'react'
import { lazy, Suspense } from 'react'
import { InfoFormSkeleton } from '@/features/info-form'
import { BackButton } from '@/shared/ui/tma'

const InfoForm = lazy(() =>
    import('@/features/info-form').then(m => ({ default: m.InfoForm }))
)

export function CarNewPage(): JSX.Element {
    return (
        <BackButton>
            <Suspense fallback={<InfoFormSkeleton />}>
                <InfoForm />
            </Suspense>
        </BackButton>
    )
}
