import type { HTMLAttributes, JSX } from 'react'
import { memo } from 'react'
import { cx } from '@/shared/lib/dom'

export const IconSkeleton = memo(function IconSkeleton({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
    return (
        <div
            className={cx('bg-subtitle h-8 w-8 rounded-lg', className)}
            {...props}
        />
    )
})
