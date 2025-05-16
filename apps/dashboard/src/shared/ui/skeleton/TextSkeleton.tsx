import type { HTMLAttributes, JSX } from 'react'
import { memo } from 'react'
import { cx } from '@/shared/lib/dom'
import { getRandomValue } from './utils/getRandomValue'

interface TextSkeletonProps {
    long?: boolean
}

const widthClasses = {
    16: 'w-16',
    20: 'w-20',
    24: 'w-24',
    28: 'w-28',
    32: 'w-32',
    36: 'w-36',
    40: 'w-40',
    44: 'w-44',
    48: 'w-48'
}

export const TextSkeleton = memo(function TextSkeleton({
    className,
    long = false,
    ...props
}: HTMLAttributes<HTMLDivElement> & TextSkeletonProps): JSX.Element {
    const width = getRandomValue(long) as keyof typeof widthClasses

    return (
        <div
            className={cx(
                'bg-content h-4 rounded-full',
                widthClasses[width],
                className
            )}
            {...props}
        />
    )
})
