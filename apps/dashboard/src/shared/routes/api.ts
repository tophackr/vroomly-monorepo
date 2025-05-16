class Api {
    me = '/user/@me'

    car = '/car'
    carId = (id: string) => `${this.car}/${id}`

    repair = (carId: string) => `${this.carId(carId)}/repair`
    repairId = (carId: string, id: string) => `${this.repair(carId)}/${id}`

    part = (carId: string) => `${this.carId(carId)}/part`
    partId = (carId: string, id: string) => `${this.part(carId)}/${id}`

    interaction = (carId: string) => `${this.carId(carId)}/interaction`
    interactionId = (carId: string, id: string) =>
        `${this.interaction(carId)}/${id}`

    fuelInteractionId = (carId: string, id: string) =>
        `${this.carId(carId)}/fuel-interaction/${id}`
    repairInteractionId = (carId: string, id: string) =>
        `${this.carId(carId)}/repair-interaction/${id}`
    partInteractionId = (carId: string, id: string) =>
        `${this.carId(carId)}/part-interaction/${id}`
    wheelInteractionId = (carId: string, id: string) =>
        `${this.carId(carId)}/wheel-interaction/${id}`
}

export const apiRoute = new Api()
