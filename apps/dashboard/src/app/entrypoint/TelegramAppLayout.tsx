import type { PropsWithChildren } from 'react'
import { UserInitProvider } from '@/entities/user'
import { TelegramProvider } from '../tma/TelegramProvider'

export function TelegramAppLayout({ children }: PropsWithChildren) {
    return (
        <TelegramProvider>
            <UserInitProvider>{children}</UserInitProvider>
        </TelegramProvider>
    )
}
