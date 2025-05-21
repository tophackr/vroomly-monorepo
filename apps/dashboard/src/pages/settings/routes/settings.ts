import { pagesRoute } from '@/shared/routes'

class Settings {
    private root = pagesRoute.settings

    notification = `${this.root}/notification`
    language = `${this.root}/language`
    timezone = `${this.root}/timezone`
    version = `${this.root}/version`
}

export const settingsRoute = new Settings()
