import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getLocale } from 'next-intl/server'
import '@telegram-apps/telegram-ui/dist/styles.css'
import 'normalize.css/normalize.css'
import { Providers } from '../providers/Providers'
import '../styles/globals.css'

export const AppLayout = memo(async function AppLayout({
    children
}: PropsWithChildren): Promise<JSX.Element> {
    const locale = await getLocale()

    return (
        <html lang={locale}>
            <body>
                <div id={'app'}>
                    <Providers>{children}</Providers>

                    <SpeedInsights />
                </div>
            </body>
        </html>
    )
})
