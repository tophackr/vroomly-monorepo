class Pages {
    home = `/`

    private car = `/car`

    carNew = `${this.car}/new`
    carId = (id: string) => `${this.car}/${id}`
    carEdit = (id: string) => `${this.car}/${id}/edit`

    settings = `/settings`
}

export const pagesRoute = new Pages()
