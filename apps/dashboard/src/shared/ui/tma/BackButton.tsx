'use client'

import { memo, useCallback, useEffect } from 'react'
import {
    hideBackButton,
    isBackButtonVisible,
    onBackButtonClick,
    showBackButton
} from '@telegram-apps/sdk-react'
import { useRouter } from '@/shared/i18n'

interface BackButtonProps {
    hide?: boolean
    route?: string
}

export const BackButton = memo(function BackButton({
    hide,
    route
}: BackButtonProps) {
    const router = useRouter()

    const onClick = useCallback(
        () => (route ? router.push(route) : router.back()),
        [route, router]
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

    return null
})
