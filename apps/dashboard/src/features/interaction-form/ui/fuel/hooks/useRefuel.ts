'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import type { InteractionDataForm } from '@/entities/interaction'
import { getPercent } from '@/shared/lib/number'
import { useWatchForm } from '@/shared/ui/form'
import { getCapacity } from '../../../model/getCapacity'

interface UseRefuelReturn {
    beforeRefuel: number
    onBeforeChange: (value: number) => void
    afterRefuel: number
    onAfterChange: (value: number) => void
    onFullChange: (value: boolean) => void
}

export function useRefuel(fuelCapacity?: number | null): UseRefuelReturn {
    if (!fuelCapacity) {
        fuelCapacity = 45
    }

    const { setValue, watch } = useFormContext<InteractionDataForm>()

    const [beforeRefuel, setBeforeRefuel] = useState(0)
    const [afterRefuel, setAfterRefuel] = useState(0)

    const isFirstRender = useRef(false)

    const onBeforeChange = useCallback(
        (value: number) => {
            setValue(
                'fuelData.beforeRefueling',
                getCapacity(value, fuelCapacity)
            )
        },
        [fuelCapacity, setValue]
    )

    const onAfterChange = useCallback(
        (value: number) => {
            setValue(
                'fuelData.afterRefueling',
                getCapacity(value, fuelCapacity)
            )
        },
        [fuelCapacity, setValue]
    )

    const onFullChange = useCallback(
        (value: boolean) => {
            if (!value) {
                setValue('fuelData.afterRefueling', fuelCapacity)
            }
        },
        [fuelCapacity, setValue]
    )

    const [watchBeforeRefueling, watchAfterRefueling, watchCapacityFull] =
        watch([
            'fuelData.beforeRefueling',
            'fuelData.afterRefueling',
            'fuelData.capacityFull'
        ])

    useEffect(() => {
        if (isFirstRender.current) {
            return
        }

        isFirstRender.current = true

        setBeforeRefuel(getPercent(watchBeforeRefueling ?? 0, fuelCapacity))
        setAfterRefuel(getPercent(watchAfterRefueling ?? 0, fuelCapacity))
    }, [watchBeforeRefueling, watchAfterRefueling, fuelCapacity])

    useEffect(() => {
        if (watchAfterRefueling !== fuelCapacity && watchCapacityFull) {
            setValue('fuelData.capacityFull', !watchCapacityFull)
        }
    }, [watchAfterRefueling, watchCapacityFull, fuelCapacity, setValue])

    const onWatchCallback = useCallback(
        ({ fuelData }: InteractionDataForm) => {
            const { beforeRefueling, afterRefueling } = fuelData!
            if (beforeRefuel !== beforeRefueling) {
                setBeforeRefuel(getPercent(beforeRefueling ?? 0, fuelCapacity))
            }

            if (afterRefuel !== afterRefueling) {
                setAfterRefuel(getPercent(afterRefueling ?? 0, fuelCapacity))
            }
        },
        [afterRefuel, beforeRefuel, fuelCapacity]
    )

    useWatchForm({
        watch,
        callback: onWatchCallback
    })

    return {
        beforeRefuel,
        onBeforeChange,
        afterRefuel,
        onAfterChange,
        onFullChange
    }
}
