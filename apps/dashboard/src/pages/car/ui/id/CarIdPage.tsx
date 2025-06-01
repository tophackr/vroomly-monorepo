import type { JSX } from 'react'
import { lazy, Suspense } from 'react'
import { useTranslations } from 'use-intl'
import type { ISegment } from '@/features/segment'
import { CarPreviewSkeleton } from '@/entities/car'
import { pagesRoute } from '@/shared/routes'
import { BackButton } from '@/shared/ui/tma'
import { Info } from './info/Info'
import { Stats } from './stats/Stats'
import { SegmentKey } from './types'

const Segments = lazy(() =>
    import('@/features/segment').then(m => ({ default: m.Segments }))
)

export function CarIdPage(): JSX.Element {
    const t = useTranslations('PreviewSegment')

    const segments: ISegment[] = [
        { key: SegmentKey.info, label: t('info'), Component: <Info /> },
        { key: SegmentKey.stats, label: t('stats'), Component: <Stats /> }
    ]

    return (
        <BackButton route={pagesRoute.home}>
            <Suspense fallback={<CarPreviewSkeleton />}>
                <Segments
                    segments={segments}
                    defaultSegment={SegmentKey.info}
                />
            </Suspense>
        </BackButton>
    )
}
