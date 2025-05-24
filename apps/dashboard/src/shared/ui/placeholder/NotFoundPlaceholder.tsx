'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Placeholder } from '@telegram-apps/telegram-ui'
import { useTranslations } from 'use-intl'
import { DuckNotFoundLottie } from '@/shared/ui/lottie'
import type { PlaceholderProps } from './props'

export const NotFoundPlaceholder = memo(function NotFoundPlaceholder({
    header,
    description,
    ...props
}: PlaceholderProps): JSX.Element {
    const t = useTranslations('Placeholder.NotFound')

    return (
        <Placeholder
            header={header ?? t('title')}
            description={description ?? t('description')}
            {...props}
        >
            <DuckNotFoundLottie className={'size-36'} />
        </Placeholder>
    )
})
