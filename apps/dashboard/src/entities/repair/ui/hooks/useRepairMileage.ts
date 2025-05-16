import { useCarContext } from '@/entities/car/@x/repair'
import { useIntlUnit } from '@/shared/i18n'
import { getPercent } from '@/shared/lib/number'

interface UseRepairMileageReturn {
    mileage?: string
    percent: number
}

export function useRepairMileage(
    repairMileage?: number | null,
    interactionMileage?: number | null
): UseRepairMileageReturn {
    const { car, mileage } = useCarContext()

    const intlUnit = useIntlUnit(car.odometerUnits)

    if (!repairMileage) {
        return {
            percent: 0
        }
    }

    const nextReplacementMileage =
        interactionMileage && interactionMileage + repairMileage - mileage
    const nextReplacementMileageOrZero = nextReplacementMileage ?? 0
    const nextReplacementMileageFixed = Math.min(
        repairMileage,
        nextReplacementMileageOrZero
    )

    const nextMileage = intlUnit.format(nextReplacementMileageFixed)
    const mileagePercent = getPercent(
        nextReplacementMileageFixed
            ? repairMileage - nextReplacementMileageFixed
            : 0,
        repairMileage
    )

    return { mileage: nextMileage, percent: mileagePercent }
}
