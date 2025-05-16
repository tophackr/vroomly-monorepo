'use client'

import { useCallback, useState } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import type { OdometerUnits } from '@vroomly/prisma'
import { useWatchForm } from '@/shared/ui/form'
import type { CarMileageForm } from '../types'

interface UseOdometerUnitsReturn {
    unit: OdometerUnits
}

export function useOdometerUnits(
    watch: UseFormWatch<CarMileageForm>,
    odometerUnits: OdometerUnits
): UseOdometerUnitsReturn {
    const [unit, setUnit] = useState<OdometerUnits>(odometerUnits)

    const unitCallback = useCallback(
        ({ odometerUnits }: CarMileageForm) => {
            if (odometerUnits === unit) {
                return
            }

            setUnit(odometerUnits)
        },
        [unit]
    )

    useWatchForm({
        watch,
        callback: unitCallback
    })

    return { unit }
}
