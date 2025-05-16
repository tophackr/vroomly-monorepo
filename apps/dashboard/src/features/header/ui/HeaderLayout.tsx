import type { PropsWithChildren } from 'react'
import { Section } from '@telegram-apps/telegram-ui'
import { usePathname } from '@/shared/i18n'
import { pagesRoute } from '@/shared/routes'
import { isAppleClient } from '@/shared/ui/tma'

export function HeaderLayout({ children }: PropsWithChildren) {
    const pathname = usePathname()

    const isApple = isAppleClient()

    return !isApple && pagesRoute.home === pathname ? (
        <Section>{children}</Section>
    ) : (
        <div>{children}</div>
    )
}
