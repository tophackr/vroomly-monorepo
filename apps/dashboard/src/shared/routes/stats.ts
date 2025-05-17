import { pagesRoute } from '@/shared/routes'

class Stats {
    private root = (carId: string) => `${pagesRoute.carId(carId)}/stats`

    cost = (carId: string) => `${this.root(carId)}/cost`
    list = (carId: string) => `${this.root(carId)}/list`
    fuel = (carId: string) => `${this.root(carId)}/fuel`
    repairs = (carId: string) => `${this.root(carId)}/repairs`
    'trip-cost' = (carId: string) => `${this.root(carId)}/trip-cost`

    repairsEdit = (carId: string) => `${this.repairs(carId)}/edit`
}

export const statsRoute = new Stats()
