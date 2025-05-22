import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { defaultTimeZone } from './config'

export const I18nProvider = memo(async function I18nProvider({
    children
}: PropsWithChildren): Promise<JSX.Element> {
    const messages = await getMessages()

    return (
        <NextIntlClientProvider
            messages={messages}
            timeZone={defaultTimeZone}
        >
            {children}
        </NextIntlClientProvider>
    )
})
