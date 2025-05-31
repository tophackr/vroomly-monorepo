'use client'

import type { JSX } from 'react'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
    hideSettingsButton,
    initDataUser,
    isSettingsButtonVisible,
    onSettingsButtonClick,
    showSettingsButton,
    useSignal
} from '@telegram-apps/sdk-react'
import { Avatar } from '@telegram-apps/telegram-ui'
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
    const navigate = useNavigate()
    const location = useLocation()

    const isVisible = useSignal(isSettingsButtonVisible)

    const onClick = useCallback(
        () => void navigate(pagesRoute.settings),
        [navigate]
    )

    useEffect(() => {
        const offClick = onSettingsButtonClick(onClick)

        return () => {
            offClick()
        }
    }, [onClick])

    useEffect(() => {
        if (visibleOnSettingsPage(isVisible, location.pathname)) {
            hideSettingsButton()
        } else if (notVisibleOnPage(isVisible, location.pathname)) {
            showSettingsButton()
        }
    }, [isVisible, location])

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
