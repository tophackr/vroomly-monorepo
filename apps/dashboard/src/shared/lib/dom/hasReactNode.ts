import type { ReactNode } from 'react'

export function hasReactNode(value: ReactNode): boolean {
    return (
        value !== undefined && value !== false && value !== null && value !== ''
    )
}
