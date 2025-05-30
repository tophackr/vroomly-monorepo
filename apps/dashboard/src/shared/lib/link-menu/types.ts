import type { IconBeforeCellProps } from '@/shared/ui/cell'

export type KeyMenu<T = string> = Omit<IMenu<T>, 'href'>

export interface IMenu<T = string> extends IconBeforeCellProps {
    name: T
    href: string
    group?: string
}
