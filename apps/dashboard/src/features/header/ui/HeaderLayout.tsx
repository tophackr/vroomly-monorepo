import type { PropsWithChildren } from 'react'
import { useLocation } from 'react-router'
import { Section } from '@telegram-apps/telegram-ui'
import { pagesRoute } from '@/shared/routes'
import { isAppleClient } from '@/shared/ui/tma'

export function HeaderLayout({ children }: PropsWithChildren) {
    const location = useLocation()

    const isApple = isAppleClient()

    return !isApple && pagesRoute.home === location.pathname ? (
        <Section>{children}</Section>
    ) : (
        <div>{children}</div>
    )
}
