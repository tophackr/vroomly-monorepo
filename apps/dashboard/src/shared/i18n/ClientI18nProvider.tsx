'use client'

import type { PropsWithChildren } from 'react'
import { memo, useEffect, useState, useTransition } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getCloudLocale, useLocale } from '@/shared/lib/store'
import { Loader } from '@/shared/ui'
import { useEffectOnce } from '../lib/dom'
import { defaultTimeZone } from './config'
import { getLocales } from './getLocales'
import type { Locale, Translation } from './types'

export const ClientI18nProvider = memo(function ClientI18nProvider({
    children
}: PropsWithChildren) {
    const { locale, setLocale } = useLocale()

    const [messages, setMessages] = useState<Translation | null>(null)
    const [, startTransition] = useTransition()

    useEffectOnce(() => {
        void getCloudLocale().then(setLocale)
    })

    useEffect(() => {
        startTransition(async () => {
            const { messages } = await getLocales(locale as Locale)
            setMessages(messages)
        })
    }, [locale])

    if (!messages) {
        return <Loader />
    }

    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone={defaultTimeZone}
        >
            {children}
        </NextIntlClientProvider>
    )
})
