import type { JSX, PropsWithChildren } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getLocale } from 'next-intl/server'
import '@telegram-apps/telegram-ui/dist/styles.css'
import 'normalize.css/normalize.css'
import { Providers } from '../providers/Providers'
import '../styles/globals.css'

export async function AppLayout({
    children
}: PropsWithChildren): Promise<JSX.Element> {
    const locale = await getLocale()

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider>
                    <div id={'app'}>
                        <Providers>{children}</Providers>

                        <SpeedInsights />
                    </div>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
