import { Locale } from './types'

export const defaultLocale = Locale.ru

export const defaultTimeZone = 'Europe/Moscow'

export const locales = [defaultLocale, Locale.en] as const
