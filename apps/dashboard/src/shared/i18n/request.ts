import { getRequestConfig } from 'next-intl/server'
import { getLocales } from './getLocales'
import { hasLocale } from './hasLocale'
import { routing } from './routing'

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async ({ requestLocale }) => {
    const requested = await requestLocale
    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale

    return getLocales(locale)
})
