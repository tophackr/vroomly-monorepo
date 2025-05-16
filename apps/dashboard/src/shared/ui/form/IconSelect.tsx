import type { JSX } from 'react'
import { memo } from 'react'
import type { SelectProps } from '@telegram-apps/telegram-ui'
import { Select } from '@telegram-apps/telegram-ui'
import type { IconBeforeCellProps } from '@/shared/ui/cell'
import { IconBeforeCell } from '@/shared/ui/cell'

export const IconSelect = memo(function IconSelect({
    icon,
    bgColor,
    ...props
}: IconBeforeCellProps & SelectProps): JSX.Element {
    return (
        <Select
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
