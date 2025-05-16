'use client'

import type { JSX } from 'react'
import { memo, useCallback } from 'react'
import type { CarIdProps } from '@/entities/car'
import type { InteractionIdProps } from '@/entities/interaction'
import { useDeleteInteractionMutation } from '@/entities/interaction'
import { useButtonClick } from '@/shared/lib/dom'
import { pagesRoute } from '@/shared/routes'
import { DeleteButton } from '@/shared/ui/action'

export const DeleteInteractionButton = memo(function DeleteInteractionButton({
    carId,
    interactionId
}: CarIdProps & InteractionIdProps): JSX.Element {
    const [deleteMutation] = useDeleteInteractionMutation()

    const deleteCallback = useCallback(
        () => deleteMutation({ carId, interactionId }),
        [carId, deleteMutation, interactionId]
    )

    const props = useButtonClick({
        route: pagesRoute.carId(carId),
        callback: deleteCallback
    })

    return <DeleteButton {...props} />
})
