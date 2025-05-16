import { pagesRoute } from '@/shared/routes'

class Stats {
    private root = (carId: string) => `${pagesRoute.carId(carId)}/stats`

    cost = (carId: string) => `${this.root(carId)}/cost`
    list = (carId: string) => `${this.root(carId)}/list`
    fuel = (carId: string) => `${this.root(carId)}/fuel`
    parts = (carId: string) => `${this.root(carId)}/parts`
    'trip-cost' = (carId: string) => `${this.root(carId)}/trip-cost`

    partsEdit = (carId: string) => `${this.parts(carId)}/edit`
}

export const statsRoute = new Stats()
