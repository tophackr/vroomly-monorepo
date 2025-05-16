import { statsRoute } from '@/shared/routes'

class Fuel {
    private root = (carId: string) => statsRoute.fuel(carId)

    consumption = (carId: string) => `${this.root(carId)}/consumption`
    fuelConsumption = (carId: string) => `${this.root(carId)}/fuel-consumption`
    costPerMileage = (carId: string) => `${this.root(carId)}/cost-per-mileage`
    mileagePerUnit = (carId: string) => `${this.root(carId)}/mileage-per-unit`
    costPerUnit = (carId: string) => `${this.root(carId)}/cost-per-unit`
}

export const fuelRoutes = new Fuel()
