'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Placeholder } from '@telegram-apps/telegram-ui'
import { DuckFlashbackLottie } from '@/shared/ui/lottie'
import type { PlaceholderProps } from './props'

export const NothingPlaceholder = memo(function NothingPlaceholder({
    header,
    description,
    ...props
}: PlaceholderProps): JSX.Element {
    const t = useTranslations('Placeholder.Nothing')

    return (
        <Placeholder
            header={header ?? t('title')}
            description={description ?? t('description')}
            {...props}
        >
            <DuckFlashbackLottie className={'size-36'} />
        </Placeholder>
    )
})
