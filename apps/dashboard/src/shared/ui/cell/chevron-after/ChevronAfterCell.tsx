'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Text } from '@telegram-apps/telegram-ui'
import { isAppleClient } from '@/shared/ui/tma'
import { Icon } from '../../icon'
import type { ChevronAfterCellProps } from './types'

export const ChevronAfterCell = memo(function ChevronCell({
    text
}: ChevronAfterCellProps): JSX.Element {
    const isApple = isAppleClient()

    return (
        <>
            {text && <Text className={'text-hint'}>{text}</Text>}

            {isApple && <Icon name={'ChevronRight'} />}
        </>
    )
})
