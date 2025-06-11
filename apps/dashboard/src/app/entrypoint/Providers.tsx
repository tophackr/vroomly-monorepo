import type { PropsWithChildren } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Toaster } from 'sonner'
import { UserInitProvider } from '@/entities/user'
import { I18nProvider } from '@/shared/i18n'
import { StoreProvider } from '../store/StoreProvider'

export function Providers({ children }: PropsWithChildren) {
    return (
        <I18nProvider>
            <StoreProvider>
                <UserInitProvider>
                    {children}
                    <Toaster />
                    <SpeedInsights />
                </UserInitProvider>
            </StoreProvider>
        </I18nProvider>
    )
}
