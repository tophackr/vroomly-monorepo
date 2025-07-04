'use client'

import type { PropsWithChildren } from 'react'
import {
    createContext,
    memo,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
    useTransition
} from 'react'
import { IntlProvider } from 'use-intl'
import { defaultLocale } from './config'
import { getLocales } from './getLocales'
import type { Locale, Translation } from './types'

interface I18nProviderProps {
    locale: Locale
    setLocale: (locale: Locale) => void
}

const Context = createContext<I18nProviderProps | null>(null)

export function useIntlContext(): I18nProviderProps {
    const context = useContext(Context)

    if (!context) {
        throw new Error('Intl Context cannot be used out of context.')
    }

    return context
}

export const I18nProvider = memo(function I18nProvider({
    children
}: PropsWithChildren) {
    const [messages, setMessages] = useState<Translation | null>()
    const [, startTransition] = useTransition()
    const [locale, setLocale] = useState<Locale>(defaultLocale)

    useLayoutEffect(() => {
        startTransition(async () => {
            const { messages: data } = await getLocales(locale)
            setMessages(data)
        })
    }, [locale])

    const value = useMemo(() => ({ locale, setLocale }), [locale])

    return (
        <Context value={value}>
            <IntlProvider
                locale={locale}
                messages={messages}
            >
                {children}
            </IntlProvider>
        </Context>
    )
})
