import type { JSX, PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { UserInitProvider } from '@/entities/user'
import { MainContextProvider } from '@/shared/model'
import { StoreProvider } from '../store/StoreProvider'
import { TelegramProvider } from '../tma/TelegramProvider'

export function Providers({ children }: PropsWithChildren): JSX.Element {
    return (
        <MainContextProvider>
            <StoreProvider>
                <TelegramProvider>
                    <UserInitProvider>{children}</UserInitProvider>
                    <Toaster />
                </TelegramProvider>
            </StoreProvider>
        </MainContextProvider>
    )
}
