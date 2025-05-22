'use client'

import type { JSX } from 'react'
import { useCallback, useEffect } from 'react'
import {
    hideSettingsButton,
    initDataUser,
    isSettingsButtonVisible,
    onSettingsButtonClick,
    showSettingsButton,
    useSignal
} from '@telegram-apps/sdk-react'
import { Avatar } from '@telegram-apps/telegram-ui'
import { usePathname, useRouter } from '@/shared/i18n'
import { pagesRoute } from '@/shared/routes'

function visibleOnSettingsPage(
    visible: boolean,
    pathname: string | null
): boolean {
    return visible && pathname === pagesRoute.settings
}

function notVisibleOnPage(visible: boolean, pathname: string | null): boolean {
    return !visible && pathname !== pagesRoute.settings
}

export function SettingsButton(): JSX.Element | false {
    const router = useRouter()
    const pathname = usePathname()

    const isVisible = useSignal(isSettingsButtonVisible)

    const onClick = useCallback(
        () => router.push(pagesRoute.settings),
        [router]
    )

    useEffect(() => {
        const offClick = onSettingsButtonClick(onClick)

        return () => {
            offClick()
        }
    }, [onClick])

    useEffect(() => {
        if (visibleOnSettingsPage(isVisible, pathname)) {
            hideSettingsButton()
        } else if (notVisibleOnPage(isVisible, pathname)) {
            showSettingsButton()
        }
    }, [isVisible, pathname])

    const user = initDataUser()

    return (
        isVisible && (
            <Avatar
                src={user?.photo_url}
                acronym={user?.first_name?.charAt(0) ?? '?'}
                onClick={onClick}
                style={{ cursor: 'pointer' }}
            />
        )
    )
}
