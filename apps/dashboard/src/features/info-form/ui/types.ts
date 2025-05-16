import type { CarData } from '@/entities/car'

export type CarDefaultFrom = Pick<CarData, 'isDefault'>
export type CarInfoForm = Pick<CarData, 'brand' | 'model' | 'name' | 'year'>
export type CarFuelForm = Pick<CarData, 'fuelType' | 'fuelCapacity'>
export type CarMileageForm = Pick<
    CarData,
    'mileage' | 'odometerUnits' | 'engineHoursEnabled' | 'engineHours'
>
