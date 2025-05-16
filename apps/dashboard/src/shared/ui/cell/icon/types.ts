import type { LucideProps } from 'lucide-react'
import type { BackgroundColor } from '@/shared/lib/dom'
import type { IconName } from '@/shared/ui/icon'

export type LucideIconBeforeCellProps = Omit<LucideProps, 'name'>

export interface IconBeforeCellProps {
    icon: IconName
    bgColor: BackgroundColor
}
