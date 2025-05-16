'use client'

import { memo, useEffect } from 'react'
import type { MainButtonState } from '@telegram-apps/sdk-react'
import {
    onMainButtonClick,
    setMainButtonParams
} from '@telegram-apps/sdk-react'

export interface MainButtonProps extends Partial<MainButtonState> {
    onClick: () => void
}

export const MainButton = memo(function MainButton({
    onClick,
    isVisible = true,
    ...params
}: MainButtonProps) {
    useEffect(() => {
        setMainButtonParams({ isVisible, ...params })
        const offClick = onMainButtonClick(onClick)

        return () => {
            setMainButtonParams({
                hasShineEffect: false,
                isEnabled: true,
                isLoaderVisible: false,
                isVisible: false
            })
            offClick()
        }
    }, [isVisible, onClick, params])

    return null
})
