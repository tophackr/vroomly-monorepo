class Pages {
    home = '/'
    carNew = '/car/new'
    carId = (id: string) => `/car/${id}`
    carEdit = (id: string) => `/car/${id}/edit`

    settings = '/settings'
}

export const pagesRoute = new Pages()
