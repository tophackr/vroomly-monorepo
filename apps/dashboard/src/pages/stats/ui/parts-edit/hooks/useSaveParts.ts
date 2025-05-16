import { useCallback } from 'react'
import { useCarContext } from '@/entities/car'
import {
    type RepairsProps,
    useUpdateManyRepairMutation
} from '@/entities/repair'
import { useRouter } from '@/shared/i18n'
import { useLogger } from '@/shared/model'
import { statsRoute } from '@/shared/routes'

interface UseSavePartsReturns {
    saveCallback: (data: RepairsProps) => void
}

export function useSaveParts(): UseSavePartsReturns {
    const router = useRouter()
    const { error: logError } = useLogger()

    const { car } = useCarContext()
    const [updateMutation] = useUpdateManyRepairMutation()

    const saveCallback = useCallback(
        (data: RepairsProps) =>
            updateMutation({ carId: car.id, body: data.repairs }).then(
                ({ error }) => {
                    router.push(statsRoute.parts(car.id))
                    if (error) logError('useSaveParts', error)
                }
            ),
        [car.id, logError, router, updateMutation]
    )

    return { saveCallback }
}
