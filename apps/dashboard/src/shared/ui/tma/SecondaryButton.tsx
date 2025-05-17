'use client'

import { memo, useEffect } from 'react'
import type { SecondaryButtonState } from '@telegram-apps/sdk-react'
import {
    onSecondaryButtonClick,
    setSecondaryButtonParams
} from '@telegram-apps/sdk-react'

export interface SecondaryButtonProps extends Partial<SecondaryButtonState> {
    onClick: () => void
}

export const SecondaryButton = memo(function SecondaryButton({
    onClick,
    isVisible = true,
    ...params
}: SecondaryButtonProps) {
    useEffect(() => {
        setSecondaryButtonParams({ isVisible, ...params })
        const offClick = onSecondaryButtonClick(onClick)

        return () => {
            setSecondaryButtonParams({
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
