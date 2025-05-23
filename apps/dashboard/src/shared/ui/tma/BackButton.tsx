'use client'

import type { PropsWithChildren } from 'react'
import { memo, useCallback, useEffect } from 'react'
import { useLocale } from 'next-intl'
import {
    hideBackButton,
    isBackButtonVisible,
    onBackButtonClick,
    showBackButton
} from '@telegram-apps/sdk-react'
import { useParams } from 'next/navigation'
import { usePathname, useRouter } from '@/shared/i18n'

interface BackButtonProps {
    hide?: boolean
    route?: string
}

const routes: string[] = []

export const BackButton = memo(function BackButton({
    children,
    hide,
    route
}: PropsWithChildren<BackButtonProps>) {
    const locale = useLocale()

    const router = useRouter()
    const pathname = usePathname()
    const params = useParams()

    const onClick = useCallback(() => {
        if (route) {
            router.push(route)
        } else {
            const perviousUrls = routes.splice(-2, 2)

            if (perviousUrls.length > 0) {
                router.replace(
                    // @ts-expect-error -- TypeScript will validate that only known `params`
                    // are used in combination with a given `pathname`. Since the two will
                    // always match for the current route, we can skip runtime checks.
                    { pathname: perviousUrls.at(0), params },
                    { locale }
                )
            } else {
                router.back()
            }
        }
    }, [locale, params, route, router])

    useEffect(() => {
        if (routes.at(-1) !== pathname) {
            routes.push(pathname)
        }
    }, [pathname])

    useEffect(() => {
        if (!isBackButtonVisible() && !hide) {
            showBackButton()
        } else if (isBackButtonVisible() && hide) {
            hideBackButton()
        }
    }, [hide])

    useEffect(() => {
        const offClick = onBackButtonClick(onClick)

        return () => {
            offClick()
        }
    }, [onClick])

    return children
})
