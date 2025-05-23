import type { JSX, PropsWithChildren } from 'react'
import { Toaster } from 'sonner'
import { MainContextProvider } from '@/shared/model'
import { StoreProvider } from '../store/StoreProvider'

export function Providers({ children }: PropsWithChildren): JSX.Element {
    return (
        <MainContextProvider>
            <StoreProvider>
                {children}
                <Toaster />
            </StoreProvider>
        </MainContextProvider>
    )
}
