import type { JSX } from 'react'
import { memo } from 'react'
import type { InputProps } from '@telegram-apps/telegram-ui'
import { Input } from '@telegram-apps/telegram-ui'
import type { IconBeforeCellProps } from '@/shared/ui/cell'
import { IconBeforeCell } from '@/shared/ui/cell'

export const IconInput = memo(function IconInput({
    icon,
    bgColor,
    ...props
}: IconBeforeCellProps & InputProps): JSX.Element {
    return (
        <Input
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
