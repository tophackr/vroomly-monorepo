'use client'

import type { PropsWithChildren } from 'react'
import { memo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'
import {
    hideBackButton,
    isBackButtonVisible,
    onBackButtonClick,
    showBackButton
} from '@telegram-apps/sdk-react'

interface BackButtonProps {
    hide?: boolean
    route?: string
}

export const BackButton = memo(function BackButton({
    children,
    hide,
    route
}: PropsWithChildren<BackButtonProps>) {
    const navigate = useNavigate()

    const onClick = useCallback(
        () => (route ? void navigate(route) : void navigate(-1)),
        [route, navigate]
    )

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
