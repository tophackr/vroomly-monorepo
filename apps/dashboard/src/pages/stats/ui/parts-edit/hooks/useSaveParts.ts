import { useCallback } from 'react'
import { useCarContext } from '@/entities/car'
import type { RepairsProps } from '@/entities/repair'
import { useUpdateManyRepairMutation } from '@/entities/repair'
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
        (data: RepairsProps) => {
            const repairs = data.repairs.map(repair => {
                const { id, option, mileage, days, isVisible, isDefault } =
                    repair
                return {
                    id,
                    mileage,
                    days,
                    isVisible,
                    ...(isDefault ? {} : { option })
                }
            })
            return updateMutation({
                carId: car.id,
                body: { repairs }
            }).then(({ error }) => {
                router.push(statsRoute.repairs(car.id))
                if (error) logError('useSaveParts', error)
            })
        },
        [car.id, logError, router, updateMutation]
    )

    return { saveCallback }
}
