'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useButtonClick } from '@/shared/lib/dom'
import { SaveButton, useVisibleSaveButton } from '@/shared/ui/action'
import { useSaveInteraction } from './hooks/useSaveInteraction'

export const SaveActionButton = memo(function SaveActionButton(): JSX.Element {
    const { saveCallback } = useSaveInteraction()

    const props = useButtonClick({
        callback: saveCallback
    })

    const { isVisible } = useVisibleSaveButton(true)

    return (
        <SaveButton
            {...props}
            isVisible={isVisible}
        />
    )
})
