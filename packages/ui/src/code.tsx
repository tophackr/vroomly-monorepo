import type { PropsWithChildren } from 'react'

interface CodeProps {
    className?: string
}

export function Code({
    children,
    className
}: PropsWithChildren<CodeProps>): JSX.Element {
    return <code className={className}>{children}</code>
}
