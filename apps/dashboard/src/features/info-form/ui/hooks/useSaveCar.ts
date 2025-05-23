import { useCallback } from 'react'
import type { Car } from '@vroomly/prisma'
import { useRouter } from 'next/navigation'
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
    const router = useRouter()

    const saveCallback = useCallback(
        (body: CarData | Car) => {
            return (
                'id' in body
                    ? updateMutation({ carId: body.id, body })
                    : createMutation({ body })
            ).then(({ data, error }) => {
                if (data?.id) {
                    router.push(pagesRoute.carId(data.id))
                }
                if (error) logError('useSaveCar', error)
            })
        },
        [createMutation, logError, router, updateMutation]
    )

    return { saveCallback }
}
