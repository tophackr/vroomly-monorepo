'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { InlineButtons } from '@telegram-apps/telegram-ui'
import type { InlineButtonsItemProps } from '@telegram-apps/telegram-ui/dist/components/Blocks/InlineButtons/components/InlineButtonsItem/InlineButtonsItem'
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
