import type {
    Messages,
    NamespaceKeys,
    NestedKeyOf,
    useTranslations
} from 'next-intl'
import type { getTranslations } from 'next-intl/server'
import type messages from './messages/ru.json'

export enum Locale {
    ru = 'ru',
    en = 'en'
}

export type Translation = typeof messages

export interface LocaleProps {
    locale: Locale
}

export interface TranslationConfig {
    locale: Locale
    messages: Translation
}

export type NestedMessages = NamespaceKeys<Messages, NestedKeyOf<Messages>>

export type NestedTranslationClient<NestedKey extends NestedMessages = never> =
    ReturnType<typeof useTranslations<NestedKey>>

export interface TranslationClient<NestedKey extends NestedMessages = never> {
    t: NestedTranslationClient<NestedKey>
}

export type MessageKeysTranslationClient<
    NestedKey extends NestedMessages = never
> = Parameters<NestedTranslationClient<NestedKey>>[0]

export type NestedTranslationServer<NestedKey extends NestedMessages = never> =
    Awaited<ReturnType<typeof getTranslations<NestedKey>>>

export interface TranslationServer<NestedKey extends NestedMessages = never> {
    t: NestedTranslationServer<NestedKey>
}

export type MessageKeysTranslationServer<
    NestedKey extends NestedMessages = never
> = Parameters<NestedTranslationServer<NestedKey>>[0]
