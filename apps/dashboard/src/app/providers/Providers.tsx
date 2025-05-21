import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'
import { ClientI18nProvider } from '@/shared/i18n'
import { MainContextProvider } from '@/shared/model'
import { StoreProvider } from '../store/StoreProvider'
import { TelegramProvider } from '../tma/TelegramProvider'

export const Providers = memo(function Providers({
    children
}: PropsWithChildren): JSX.Element {
    return (
        <MainContextProvider>
            <StoreProvider>
                <TelegramProvider>
                    <ClientI18nProvider>{children}</ClientI18nProvider>
                    <Toaster />
                    <SpeedInsights />
                </TelegramProvider>
            </StoreProvider>
        </MainContextProvider>
    )
})
