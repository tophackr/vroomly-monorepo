import type { Car } from '@vroomly/prisma'

export interface CarProps {
    car: Car
}

export interface CarMileageProps {
    mileage: number
}

export interface CarIdProps {
    carId: string
}
