import type { JSX } from 'react'
import { memo } from 'react'
import type { CellProps } from '@telegram-apps/telegram-ui'
import { Cell } from '@telegram-apps/telegram-ui'
import { IconBeforeCell } from './icon/IconBeforeCell'
import type { IconBeforeCellProps } from './icon/types'

export const IconCell = memo(function IconCell({
    icon,
    bgColor,
    ...props
}: IconBeforeCellProps & CellProps): JSX.Element {
    return (
        <Cell
            before={
                <IconBeforeCell
                    icon={icon}
                    bgColor={bgColor}
                />
            }
            {...props}
        />
    )
})
