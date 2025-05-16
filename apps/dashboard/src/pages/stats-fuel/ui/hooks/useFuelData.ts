'use client'

import { useMemo } from 'react'
import type { FuelData } from '../types'
import { useFuelInteractions } from './useFuelInteractions'

interface GroupedMonths {
    [month: string]: FuelData
}

const initFuelData: FuelData = { distance: 0, fuel: 0, allFuel: 0, cost: 0 }

function useAllFuelData<T extends boolean>(
    month: T
): T extends true ? GroupedMonths : FuelData {
    const interactions = useFuelInteractions()

    const fuelData = useMemo(() => {
        if (interactions.length === 0) {
            return month ? {} : { ...initFuelData }
        }

        let previousMileage: number | null = null
        const monthsData: Record<string, FuelData> = {}
        const total: FuelData = { ...initFuelData }

        for (let i = interactions.length - 1; i >= 0; i--) {
            const {
                date: iDate,
                amount,
                mileage,
                fuelInteraction
            } = interactions[i]!
            const { capacity, price } = fuelInteraction!

            const fuelToAdd =
                capacity === null
                    ? price !== null && price !== 0
                        ? Number((amount ?? 0) / price)
                        : 0
                    : Number(capacity)

            const distance =
                previousMileage !== null && mileage !== null
                    ? mileage - previousMileage
                    : 0

            if (previousMileage !== null && mileage !== null) {
                total.distance += distance
                total.cost += Number(amount ?? 0)
                total.fuel += fuelToAdd
            }

            total.allFuel += fuelToAdd

            if (month) {
                const date = new Date(iDate)
                const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`

                if (!monthsData[monthKey]) {
                    monthsData[monthKey] = { ...initFuelData }
                }

                if (previousMileage !== null && mileage !== null) {
                    monthsData[monthKey].distance += distance
                    monthsData[monthKey].cost += Number(amount ?? 0)
                    monthsData[monthKey].fuel += fuelToAdd
                }

                monthsData[monthKey].allFuel += fuelToAdd
            }

            previousMileage = mileage ?? previousMileage
        }

        return month ? monthsData : total
    }, [interactions, month])

    return fuelData as T extends true ? GroupedMonths : FuelData
}

export function useFuelData(): FuelData {
    return useAllFuelData(false)
}

export function useGroupedFuelData(): GroupedMonths {
    return useAllFuelData(true)
}
