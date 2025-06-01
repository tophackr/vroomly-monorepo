import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import type { Car } from '@vroomly/prisma'
import type { CarData } from '@/entities/car'
import { useCreateCarMutation, useUpdateCarMutation } from '@/entities/car'
import { useLogger } from '@/shared/model'
import { pagesRoute } from '@/shared/routes'

interface UseSaveCarReturns {
    saveCallback: (data: CarData | Car) => void
}

export function useSaveCar(): UseSaveCarReturns {
    const { error: logError } = useLogger()

    const [createMutation] = useCreateCarMutation()
    const [updateMutation] = useUpdateCarMutation()
    const navigate = useNavigate()

    const saveCallback = useCallback(
        (body: CarData | Car) => {
            return (
                'id' in body
                    ? updateMutation({ carId: body.id, body })
                    : createMutation({ body })
            ).then(({ data, error }) => {
                if (data?.id) {
                    void navigate(pagesRoute.carId(data.id))
                }
                if (error) logError('useSaveCar', error)
            })
        },
        [createMutation, logError, navigate, updateMutation]
    )

    return { saveCallback }
}
