'use client'

import type { JSX } from 'react'
import { useCarContext } from '@/entities/car'
import { useButtonClick } from '@/shared/lib/dom'
import { statsRoute } from '@/shared/routes'
import { SaveButton, useVisibleSaveButton } from '@/shared/ui/action'
import { useSaveRepairs } from './hooks/useSaveRepairs'

export function RepairsSaveButton(): JSX.Element {
    const { saveCallback } = useSaveRepairs()
    const { car } = useCarContext()

    const props = useButtonClick({
        route: statsRoute.repairs(car.id),
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
