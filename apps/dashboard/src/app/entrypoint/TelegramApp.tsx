import type { PropsWithChildren } from 'react'
import {
    isMiniAppDark,
    retrieveLaunchParams,
    useSignal
} from '@telegram-apps/sdk-react'
import { AppRoot } from 'tmaui'
import { isAppleClient } from '@/shared/ui/tma'

export function TelegramApp({ children }: PropsWithChildren) {
    const lp = retrieveLaunchParams()
    const isApple = isAppleClient(lp)
    const isDark = useSignal(isMiniAppDark)

    return (
        <AppRoot
            appearance={isDark ? 'dark' : 'light'}
            platform={isApple ? 'ios' : 'base'}
        >
            {children}
        </AppRoot>
    )
}
