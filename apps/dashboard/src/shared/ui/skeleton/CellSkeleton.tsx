import type { JSX } from 'react'
import { memo } from 'react'
import type { CellProps } from '@telegram-apps/telegram-ui'
import { Cell } from '@telegram-apps/telegram-ui'
import { TextSkeleton } from './TextSkeleton'

interface CellSkeletonProps extends Omit<CellProps, 'subhead' | 'children'> {
    short?: boolean
}

export const CellSkeleton = memo(function CellSkeleton({
    short = false,
    ...props
}: CellSkeletonProps): JSX.Element {
    return (
        <Cell
            subhead={!short && <TextSkeleton className={'bg-subtitle mb-1'} />}
            {...props}
        >
            {short ? (
                <TextSkeleton className={'bg-subtitle py-3'} />
            ) : (
                <TextSkeleton long />
            )}
        </Cell>
    )
})
