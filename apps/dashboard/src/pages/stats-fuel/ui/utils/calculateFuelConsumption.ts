import { toFixedNumber } from '@/shared/lib/number'
import type { FuelData } from '../types'

interface CalculateFuelConsumptionReturn {
    fuelPer100km: number
    costPerKm: number
    distancePerLiter: number
    costPerLiter: number
}

export function calculateFuelConsumption(
    data: FuelData
): CalculateFuelConsumptionReturn {
    const fuelPer100km = (data.fuel * 100) / data.distance
    const costPerKm = data.cost / data.distance
    const distancePerLiter = data.distance / data.fuel
    const costPerLiter = data.cost / data.fuel

    return {
        fuelPer100km: toFixedNumber(fuelPer100km || 0),
        costPerKm: toFixedNumber(costPerKm || 0),
        distancePerLiter: toFixedNumber(distancePerLiter || 0),
        costPerLiter: toFixedNumber(costPerLiter || 0)
    }
}
