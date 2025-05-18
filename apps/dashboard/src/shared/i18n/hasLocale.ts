import type { Locale } from './types'

export function hasLocale<LocaleType extends Locale>(
    locales: ReadonlyArray<LocaleType>,
    candidate: unknown
): candidate is LocaleType {
    return locales.includes(candidate as LocaleType)
}
