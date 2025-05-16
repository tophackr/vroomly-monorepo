import { toast as sonnerToast } from 'sonner'
import { SnackbarToast } from './SnackbarToast'
import type { ToastProps } from './types'

export function toast({
    duration = 4000,
    description,
    ...props
}: Omit<ToastProps, 'id'>): string | number {
    if (Array.isArray(description)) {
        description = description.map((i, index) => <p key={index}>{i}</p>)
    }

    return sonnerToast.custom(
        id => (
            <SnackbarToast
                id={id}
                duration={duration}
                description={description}
                {...props}
            />
        ),
        { duration }
    )
}
