import type React from 'react'
import type { MouseClickEvent } from '@/shared/lib/dom'
import type { IconName } from '@/shared/ui/icon'

export type EditButtonProps = MouseClickEvent<
    React.MouseEvent<Element, MouseEvent>
> & {
    icon?: IconName
}
