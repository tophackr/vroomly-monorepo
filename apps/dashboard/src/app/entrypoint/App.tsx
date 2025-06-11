import { AppRouter } from '../routes/AppRouter'
import { Providers } from './Providers'
import { TelegramUI } from './TelegramUI'
import { ErrorBoundary } from './tma/components/ErrorBoundary'
import { ErrorPage } from './tma/components/ErrorPage'

export function App() {
    return (
        <ErrorBoundary fallback={ErrorPage}>
            <TelegramUI>
                <Providers>
                    <AppRouter />
                </Providers>
            </TelegramUI>
        </ErrorBoundary>
    )
}
