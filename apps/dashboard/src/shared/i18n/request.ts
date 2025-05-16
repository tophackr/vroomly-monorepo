import { getRequestConfig } from 'next-intl/server'
import { getLocales } from './getLocales'
import { routing } from './routing'
import type { Locale } from './types'

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale

    if (!locale || !routing.locales.includes(locale as Locale)) {
        locale = routing.defaultLocale
    }

    return getLocales(locale as Locale)
})
