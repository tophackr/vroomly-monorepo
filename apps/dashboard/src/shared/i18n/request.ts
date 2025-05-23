import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, locales } from './config'
import { getCookieLocale } from './cookie'
import { getLocales } from './getLocales'

// eslint-disable-next-line import/no-default-export
export default getRequestConfig(async () => {
    const requested = await getCookieLocale()
    const locale = hasLocale(locales, requested) ? requested : defaultLocale

    return {
        ...(await getLocales(locale)),
        experimental: {
            createMessagesDeclaration: './messages/ru.json'
        }
    }
})
