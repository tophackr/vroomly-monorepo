/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import deepmerge from 'deepmerge'
import { defaultLocale, locales } from './config'
import type { Locale, TranslationConfig } from './types'

function isNotDefaultLocale(locale: Locale): boolean {
    return locale !== defaultLocale && locales.includes(locale)
}

export async function getLocales(
    locale: Locale = defaultLocale
): Promise<TranslationConfig> {
    const [defaultMessages, userMessages] = await Promise.all([
        import(`./messages/${defaultLocale}.json`).then(m => m.default),
        isNotDefaultLocale(locale) &&
            import(`./messages/${locale}.json`).then(m => m.default)
    ])

    const mergedMessaged = userMessages
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          deepmerge(defaultMessages, userMessages)
        : defaultMessages

    return {
        locale,
        messages: mergedMessaged
    }
}
