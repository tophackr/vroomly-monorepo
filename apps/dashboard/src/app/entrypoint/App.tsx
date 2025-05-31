import { BrowserRouter } from 'react-router'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Toaster } from 'sonner'
import { UserInitProvider } from '@/entities/user'
import { I18nProvider } from '@/shared/i18n'
import { MainProvider } from '@/shared/model'
import { AppRouter } from '../entrypoint/AppRouter'
import { StoreProvider } from '../store/StoreProvider'
import { TelegramApp } from './TelegramApp'
import { ErrorBoundary } from './tma/components/ErrorBoundary'
import { ErrorPage } from './tma/components/ErrorPage'

export function App() {
    return (
        <ErrorBoundary fallback={ErrorPage}>
            <TelegramApp>
                <BrowserRouter>
                    <I18nProvider>
                        <MainProvider>
                            <StoreProvider>
                                <UserInitProvider>
                                    <AppRouter />
                                    <Toaster />
                                    <SpeedInsights />
                                </UserInitProvider>
                            </StoreProvider>
                        </MainProvider>
                    </I18nProvider>
                </BrowserRouter>
            </TelegramApp>
        </ErrorBoundary>
    )
}
