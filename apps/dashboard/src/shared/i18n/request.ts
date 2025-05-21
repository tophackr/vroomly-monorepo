import { getRequestConfig } from 'next-intl/server'
import { getCloudLocale } from '@/shared/lib/store'
import { defaultLocale, locales } from './config'
import { getLocales } from './getLocales'
import { hasLocale } from './hasLocale'

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async () => {
    const requested = await getCloudLocale()
    const locale = hasLocale(locales, requested) ? requested : defaultLocale

    return getLocales(locale)
})
