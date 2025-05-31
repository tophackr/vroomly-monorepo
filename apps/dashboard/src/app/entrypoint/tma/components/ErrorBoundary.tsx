import type {
    ComponentType,
    GetDerivedStateFromError,
    PropsWithChildren,
    ReactNode
} from 'react'
import { Component } from 'react'

export interface ErrorBoundaryProps extends PropsWithChildren {
    fallback?: ReactNode | ComponentType<{ error: unknown }>
}

interface ErrorBoundaryState {
    error?: Error
}

export class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    override state: ErrorBoundaryState = {}

    static getDerivedStateFromError: GetDerivedStateFromError<
        ErrorBoundaryProps,
        ErrorBoundaryState
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    > = error => ({ error })

    override componentDidCatch(error: Error) {
        this.setState({ error })
    }

    override render() {
        const {
            state: { error },
            props: { fallback: Fallback, children },
            state
        } = this

        return 'error' in state ? (
            typeof Fallback === 'function' ? (
                <Fallback error={error} />
            ) : (
                Fallback
            )
        ) : (
            children
        )
    }
}
