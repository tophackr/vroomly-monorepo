import type { JSX } from 'react'
import { lazy, Suspense } from 'react'
import { ListSection } from '@/shared/ui'
import { BackButton } from '@/shared/ui/tma'
import { CarCreateButton } from './CarCreateButton'
import { CarsContentLoading } from './CarsContentLoading'

const CarsContent = lazy(() =>
    import('./CarsContent').then(m => ({ default: m.CarsContent }))
)

export function HomePage(): JSX.Element {
    return (
        <BackButton hide={true}>
            <ListSection>
                <Suspense fallback={<CarsContentLoading />}>
                    <CarsContent />
                </Suspense>

                <CarCreateButton />
            </ListSection>
        </BackButton>
    )
}
