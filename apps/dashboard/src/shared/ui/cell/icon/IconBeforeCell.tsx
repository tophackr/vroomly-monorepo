'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { cx } from '@/shared/lib/dom'
import { Icon } from '@/shared/ui/icon'
import { isAppleClient } from '@/shared/ui/tma'
import styles from './IconBeforeCell.module.css'
import type { IconBeforeCellProps, LucideIconBeforeCellProps } from './types'

export const IconBeforeCell = memo(function IconBeforeCell({
    icon,
    bgColor,
    className,
    ...props
}: IconBeforeCellProps & LucideIconBeforeCellProps): JSX.Element {
    const isApple = isAppleClient()

    return (
        <Icon
            name={icon}
            className={cx(
                isApple ? styles['apple-icon'] : 'text-hint',
                className
            )}
            style={
                isApple
                    ? {
                          backgroundColor: bgColor,
                          color: '#fff'
                      }
                    : undefined
            }
            {...props}
        />
    )
})
