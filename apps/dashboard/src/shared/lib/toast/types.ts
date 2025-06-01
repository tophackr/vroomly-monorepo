import type { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import type { LinkProps } from 'tmaui'

interface ToastButton {
    label: string
    onClick: () => void
}

export interface ToastProps {
    id: string | number
    icon?: ReactNode
    title: string
    description: ReactNode
    button?: ToastButton
    link?: ReactElement<LinkProps, string | JSXElementConstructor<unknown>>
    duration?: number
    onClose?: () => void
}
