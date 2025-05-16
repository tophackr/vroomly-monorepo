import type { useTranslations } from 'next-intl'
import type { getTranslations } from 'next-intl/server'
import type messages from './messages/ru.json'

export enum Locale {
    ru = 'ru',
    en = 'en'
}

export interface LocaleProps {
    locale: Locale
}

export type Translation = typeof messages

export interface TranslationConfig {
    locale: Locale
    messages: Translation
}

export type NestedTranslationClient<T extends keyof Translation = never> =
    ReturnType<typeof useTranslations<T>>

export interface TranslationClient<T extends keyof Translation = never> {
    t: NestedTranslationClient<T>
}

export type MessageKeysTranslationClient<T extends keyof Translation = never> =
    Parameters<NestedTranslationClient<T>>[0]

export type NestedTranslationServer<T extends keyof Translation = never> =
    Awaited<ReturnType<typeof getTranslations<T>>>

export interface TranslationServer<T extends keyof Translation = never> {
    t: NestedTranslationServer<T>
}

export type MessageKeysTranslationServer<T extends keyof Translation = never> =
    Parameters<NestedTranslationServer<T>>[0]
