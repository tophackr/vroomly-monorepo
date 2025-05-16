import type {
    ComponentType,
    GetDerivedStateFromError,
    PropsWithChildren
} from 'react'
import { Component } from 'react'

interface ErrorBoundaryProps extends PropsWithChildren {
    fallback: ComponentType<{ error: Error }>
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
            props: { fallback: Fallback, children }
        } = this

        return error ? <Fallback error={error} /> : children
    }
}
