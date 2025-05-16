import type { JSX } from 'react'
import { memo } from 'react'
import type { AvatarProps } from '@telegram-apps/telegram-ui'
import { Avatar } from '@telegram-apps/telegram-ui'
import { cx } from '@/shared/lib/dom'

export const AvatarSkeleton = memo(function AvatarSkeleton({
    className,
    ...props
}: AvatarProps): JSX.Element {
    return (
        <Avatar
            className={cx('bg-secondary', className)}
            {...props}
        />
    )
})
