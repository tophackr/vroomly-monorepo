import type { JSX } from 'react'
import { memo, useEffect } from 'react'
import { useLogger } from '@/shared/model'

export const ErrorPage = memo(function ErrorPage({
    error,
    reset
}: {
    error: Error & { digest?: string }
    reset?: () => void
}): JSX.Element {
    const { forceError } = useLogger()

    useEffect(() => {
        // Log the error to an error reporting service
        forceError('ErrorPage', error)
    }, [error, forceError])

    return (
        <div>
            <h2>An unhandled error occurred!</h2>
            <blockquote>
                <code>{error.message}</code>
            </blockquote>
            {reset && <button onClick={() => reset()}>Try again</button>}
        </div>
    )
})
