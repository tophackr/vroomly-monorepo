import type { HTMLAttributes, JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { cx } from '@/shared/lib/dom'

export const PulseSkeletonLayout = memo(function PulseSkeletonLayout({
    children,
    className,
    ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>): JSX.Element {
    return (
        <div
            role='status'
            className={cx('animate-pulse', className)}
            {...props}
        >
            {children}

            <span className='sr-only'>Loading...</span>
        </div>
    )
})
