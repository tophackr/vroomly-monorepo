'use client'

import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { isMiniAppDark, useSignal } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { useClientOnce } from '@/shared/lib/dom'
import { Loader } from '@/shared/ui'
import { isAppleClient, useLaunchParams } from '@/shared/ui/tma'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorPage } from './components/ErrorPage'
import { init } from './init'
import { mockEnv } from './mocks/mockEnv'
import { useDidMount } from './useDidMount'

const RootInner = memo(function RootInner({
    children
}: PropsWithChildren): JSX.Element {
    // eslint-disable-next-line no-undef
    const isDev = process.env.NODE_ENV === 'development'

    // Mock Telegram environment in development mode if needed.
    useClientOnce(() => {
        void mockEnv(isDev)
    })

    const lp = useLaunchParams()
    const isApple = isAppleClient(lp)

    const { tgWebAppPlatform: platform, tgWebAppStartParam } = lp
    const debug = isDev || (tgWebAppStartParam || '').includes('debug')

    // Initialize the library.
    useClientOnce(() => {
        init({
            debug,
            eruda: debug && ['ios', 'android'].includes(platform),
            mockForMacOS: platform === 'macos'
        })
    })

    const isDark = useSignal(isMiniAppDark)

    return (
        <AppRoot
            appearance={isDark ? 'dark' : 'light'}
            platform={isApple ? 'ios' : 'base'}
        >
            {children}
        </AppRoot>
    )
})

export const TelegramProvider = memo(function TelegramProvider(
    props: PropsWithChildren
) {
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of
    // the Server Side Rendering. That's why we are showing loader on the server
    // side.
    const didMount = useDidMount()

    return didMount ? (
        <ErrorBoundary fallback={ErrorPage}>
            <RootInner {...props} />
        </ErrorBoundary>
    ) : (
        <Loader />
    )
})
