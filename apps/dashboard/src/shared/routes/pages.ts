class Pages {
    home = `/app`

    private car = `${this.home}/car`

    carNew = `${this.car}/new`
    carId = (id: string) => `${this.car}/${id}`
    carEdit = (id: string) => `${this.car}/${id}/edit`

    settings = `${this.home}/settings`
}

export const pagesRoute = new Pages()
