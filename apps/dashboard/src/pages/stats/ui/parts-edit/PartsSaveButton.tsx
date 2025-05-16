'use client'

import type { JSX } from 'react'
import { useCarContext } from '@/entities/car'
import { useButtonClick } from '@/shared/lib/dom'
import { statsRoute } from '@/shared/routes'
import { SaveButton, useVisibleSaveButton } from '@/shared/ui/action'
import { useSaveParts } from './hooks/useSaveParts'

export function PartsSaveButton(): JSX.Element {
    const { saveCallback } = useSaveParts()
    const { car } = useCarContext()

    const props = useButtonClick({
        route: statsRoute.parts(car.id),
        callback: saveCallback
    })

    const { isVisible } = useVisibleSaveButton()

    return (
        <SaveButton
            {...props}
            isVisible={isVisible}
        />
    )
}
