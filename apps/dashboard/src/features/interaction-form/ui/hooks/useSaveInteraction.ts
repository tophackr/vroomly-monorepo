import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useCarContext } from '@/entities/car'
import type {
    InteractionDataForm,
    InteractionResData
} from '@/entities/interaction'
import {
    useCreateInteractionMutation,
    useUpdateInteractionMutation
} from '@/entities/interaction'
import { useLogger } from '@/shared/model'
import { pagesRoute } from '@/shared/routes'

interface UseSaveInteractionReturn {
    saveCallback: (data: InteractionDataForm | InteractionResData) => void
}

export function useSaveInteraction(): UseSaveInteractionReturn {
    const router = useRouter()
    const { error: logError } = useLogger()

    const [createMutation] = useCreateInteractionMutation()
    const [updateMutation] = useUpdateInteractionMutation()

    const { car } = useCarContext()

    const saveCallback = useCallback(
        (body: InteractionDataForm | InteractionResData) =>
            ('id' in body
                ? updateMutation({
                      carId: car.id,
                      interactionId: body.id,
                      body
                  })
                : createMutation({ carId: car.id, body })
            ).then(({ data, error }) => {
                if (data?.id) {
                    router.push(pagesRoute.carId(car.id))
                }
                if (error) logError('useSaveInteraction', error)
            }),
        [car.id, createMutation, logError, router, updateMutation]
    )

    return { saveCallback }
}
