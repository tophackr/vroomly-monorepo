import type { JSX } from 'react'
import { getTranslations } from 'next-intl/server'
import type { ISegment } from '@/features/segment'
import { pagesRoute } from '@/shared/routes'
import { BackButton } from '@/shared/ui/tma'
import { DynamicSegments } from './DynamicSegments'
import { Info } from './info/Info'
import { Stats } from './stats/Stats'
import { SegmentKey } from './types'

export async function CarIdPage(): Promise<JSX.Element> {
    const t = await getTranslations('PreviewSegment')

    const segments: ISegment[] = [
        { key: SegmentKey.info, label: t('info'), Component: <Info /> },
        { key: SegmentKey.stats, label: t('stats'), Component: <Stats /> }
    ]

    return (
        <>
            <BackButton route={pagesRoute.home} />

            <DynamicSegments
                segments={segments}
                defaultSegment={SegmentKey.info}
            />
        </>
    )
}
