import deepmerge from 'deepmerge'
import { defaultLocale, locales } from './config'
import type { Locale, TranslationConfig } from './types'

function isNotDefaultLocale(locale: Locale): boolean {
    return locale !== defaultLocale && locales.includes(locale)
}

export async function getLocales(
    locale: Locale = defaultLocale
): Promise<TranslationConfig> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [defaultMessages, userMessages] = await Promise.all([
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        import(`./messages/${defaultLocale}.json`).then(m => m.default),
        isNotDefaultLocale(locale) &&
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
            import(`./messages/${locale}.json`).then(m => m.default)
    ])

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const mergedMessaged = userMessages
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          deepmerge(defaultMessages, userMessages)
        : defaultMessages

    return {
        locale,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        messages: mergedMessaged
    }
}
