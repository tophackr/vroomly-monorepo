import type { HTMLAttributes } from 'react'
import { memo } from 'react'
import { cx } from '@/shared/lib/dom'
import { TextSkeleton } from './TextSkeleton'

interface SectionHeaderSkeletonProps {
    large?: boolean
}

export const SectionHeaderSkeleton = memo(function SectionHeaderSkeleton({
    className,
    large = false,
    ...props
}: HTMLAttributes<HTMLDivElement> & SectionHeaderSkeletonProps) {
    return (
        <TextSkeleton
            className={cx(
                large ? 'mb-4' : 'bg-subtitle ms-4 mt-8 mb-2',
                className
            )}
            {...props}
        />
    )
})
