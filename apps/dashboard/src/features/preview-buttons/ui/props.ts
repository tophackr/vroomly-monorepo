import type { JSX } from 'react'
import type { Translation } from '@/shared/i18n'
import type { IconName } from '@/shared/ui/icon'
import type { ContentsProps } from './contents/props'

export interface ActionButtonProps {
    icon: IconName
    name: keyof Translation['CarActionButtons']
}

export interface ActionButtonContentProps extends ActionButtonProps {
    Content: (props: ContentsProps) => JSX.Element[]
}

export interface ActionButtonLinkProps extends ActionButtonProps {
    link: string
}

export type ActionModalProps = ActionButtonContentProps | ActionButtonLinkProps
