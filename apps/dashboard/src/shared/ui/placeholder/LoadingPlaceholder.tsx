'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import type { PlaceholderProps } from '@telegram-apps/telegram-ui'
import { Placeholder } from '@telegram-apps/telegram-ui'
import { DuckLoadingLottie } from '@/shared/ui/lottie'

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
            <DuckLoadingLottie className={'size-36'} />
        </Placeholder>
    )
})
