import type { JSX } from 'react'
import { memo } from 'react'
import { ListSection } from '@/shared/ui'
import { CostCell } from './CostCell'
import type { InteractionDataProps } from './props'

export const CostData = memo(function CostData({
    data,
    totalCount
}: InteractionDataProps): JSX.Element {
    return (
        <ListSection>
            {data.map(([key, value]) => (
                <CostCell
                    key={key}
                    title={key}
                    value={value}
                    totalCount={totalCount}
                />
            ))}
        </ListSection>
    )
})
