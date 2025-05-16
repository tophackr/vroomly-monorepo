import type { HTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'
import { Text } from '@telegram-apps/telegram-ui'
import { cx } from '@/shared/lib/dom'
import { isAppleClient } from '@/shared/ui/tma'
import styles from './ModalHeader.module.css'

export interface ModalHeaderProps extends HTMLAttributes<HTMLElement> {
    /** Inserts a component before the header text, e.g. Icon */
    before?: ReactNode
    /** Inserts a component after the header text, e.g. Icon */
    after?: ReactNode
}

export const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>(
    ({ before, after, className, children, ...props }, ref) => {
        const isApple = isAppleClient()

        return (
            <header
                ref={ref}
                className={cx(styles.wrapper, className)}
                {...props}
            >
                <div className={styles.before}>{before}</div>
                {isApple && (
                    <Text
                        weight='2'
                        className={styles.children}
                    >
                        {children}
                    </Text>
                )}
                <div className={styles.after}>{after}</div>
            </header>
        )
    }
)

ModalHeader.displayName = 'ModalHeader'
