'use client'

import type { JSX } from 'react'
import { useTranslations } from 'use-intl'
import type { ISegment } from '@/features/segment'
import { pagesRoute } from '@/shared/routes'
import { BackButton } from '@/shared/ui/tma'
import { DynamicSegments } from './DynamicSegments'
import { Info } from './info/Info'
import { Stats } from './stats/Stats'
import { SegmentKey } from './types'

export function CarIdPage(): JSX.Element {
    const t = useTranslations('PreviewSegment')

    const segments: ISegment[] = [
        { key: SegmentKey.info, label: t('info'), Component: <Info /> },
        { key: SegmentKey.stats, label: t('stats'), Component: <Stats /> }
    ]

    return (
        <BackButton route={pagesRoute.home}>
            <DynamicSegments
                segments={segments}
                defaultSegment={SegmentKey.info}
            />
        </BackButton>
    )
}
