'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Text } from '@telegram-apps/telegram-ui'
import { Icon16Chevron } from '@telegram-apps/telegram-ui/dist/icons/16/chevron'
import { isAppleClient } from '@/shared/ui/tma'
import type { ChevronAfterCellProps } from './types'

export const ChevronAfterCell = memo(function ChevronCell({
    text
}: ChevronAfterCellProps): JSX.Element {
    const isApple = isAppleClient()

    return (
        <>
            {text && <Text className={'text-hint'}>{text}</Text>}

            {isApple && <Icon16Chevron className={'text-subtitle ml-1'} />}
        </>
    )
})
