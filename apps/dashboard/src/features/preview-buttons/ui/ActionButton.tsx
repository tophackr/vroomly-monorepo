'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import type { InlineButtonsItemProps } from 'tmaui'
import { InlineButtons } from 'tmaui'
import { useTranslations } from 'use-intl'
import { Icon } from '@/shared/ui/icon'
import type { ActionButtonProps } from './props'

export const ActionButton = memo(function ActionButton({
    icon,
    name,
    ...props
}: ActionButtonProps & InlineButtonsItemProps): JSX.Element {
    const t = useTranslations('CarActionButtons')

    return (
        <InlineButtons.Item
            text={t(name)}
            {...props}
        >
            <Icon name={icon} />
        </InlineButtons.Item>
    )
})
