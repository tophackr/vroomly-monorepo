'use client'

import type { PropsWithChildren } from 'react'

interface ButtonProps {
    className?: string
    appName: string
}

export const Button = ({
    children,
    className,
    appName
}: PropsWithChildren<ButtonProps>) => {
    return (
        <button
            className={className}
            onClick={() => alert(`Hello from your ${appName} app!`)}
        >
            {children}
        </button>
    )
}
