'use client'

import { memo, useEffect } from 'react'
import type { SecondaryButtonState } from '@telegram-apps/sdk-react'
import {
    mountSecondaryButton,
    onSecondaryButtonClick,
    setSecondaryButtonParams,
    unmountSecondaryButton
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
        mountSecondaryButton()

        return () => {
            setSecondaryButtonParams({
                hasShineEffect: false,
                isEnabled: true,
                isLoaderVisible: false,
                isVisible: false
            })
            unmountSecondaryButton()
        }
    }, [])

    useEffect(() => {
        setSecondaryButtonParams({ isVisible, ...params })
    }, [isVisible, params])

    useEffect(() => {
        const offClick = onSecondaryButtonClick(onClick)

        return () => {
            offClick()
        }
    }, [onClick])

    return null
})
