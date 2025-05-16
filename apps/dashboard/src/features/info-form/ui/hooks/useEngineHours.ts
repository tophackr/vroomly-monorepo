'use client'

import { useCallback, useState } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import { useWatchForm } from '@/shared/ui/form'
import type { CarMileageForm } from '../types'

interface UseEngineHoursReturn {
    engineEnabled: boolean
}

export function useEngineHours(
    watch: UseFormWatch<CarMileageForm>,
    engineHours: boolean
): UseEngineHoursReturn {
    const [engineEnabled, setEngineEnabled] = useState<boolean>(engineHours)

    const engineCallback = useCallback(
        ({ engineHoursEnabled }: CarMileageForm) => {
            if (engineHoursEnabled === engineEnabled) {
                return
            }

            setEngineEnabled(engineHoursEnabled)
        },
        [engineEnabled]
    )

    useWatchForm({
        watch,
        callback: engineCallback
    })

    return { engineEnabled }
}
