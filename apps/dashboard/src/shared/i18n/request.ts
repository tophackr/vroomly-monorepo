import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, locales } from './config'
import { getLocales } from './getLocales'
import { hasLocale } from './hasLocale'

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async () => {
    const requested = 'ru'
    const locale = hasLocale(locales, requested) ? requested : defaultLocale

    return getLocales(locale)
})
