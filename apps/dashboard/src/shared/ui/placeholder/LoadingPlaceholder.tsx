'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Placeholder } from 'tmaui'
import { useTranslations } from 'use-intl'
import { DuckLoadingLottie } from '@/shared/ui/lottie'
import type { PlaceholderProps } from './props'

export const LoadingPlaceholder = memo(function LoadingPlaceholder({
    header,
    description,
    ...props
}: PlaceholderProps): JSX.Element {
    const t = useTranslations('Placeholder.Loading')

    return (
        <Placeholder
            header={header ?? t('title')}
            description={description ?? t('description')}
            {...props}
        >
            <DuckLoadingLottie className='size-36' />
        </Placeholder>
    )
})
