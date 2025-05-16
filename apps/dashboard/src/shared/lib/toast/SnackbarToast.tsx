import type { JSX } from 'react'
import { Snackbar } from '@telegram-apps/telegram-ui'
import { toast as sonnerToast } from 'sonner'
import { callMultiple, hasReactNode } from '@/shared/lib/dom'
import { Icon } from '@/shared/ui/icon'
import type { ToastProps } from './types'

export function SnackbarToast({
    id,
    icon,
    title,
    button,
    onClose,
    ...props
}: ToastProps): JSX.Element {
    return (
        <Snackbar
            key={id}
            before={hasReactNode(icon) ? icon : <Icon name={'CircleX'} />}
            after={
                button && (
                    <Snackbar.Button
                        onClick={callMultiple(button.onClick, () =>
                            sonnerToast.dismiss(id)
                        )}
                    >
                        {button.label}
                    </Snackbar.Button>
                )
            }
            onClose={callMultiple(onClose)}
            {...props}
        >
            {title}
        </Snackbar>
    )
}
