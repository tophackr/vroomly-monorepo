import type { JSX, PropsWithChildren } from 'react'
import { memo } from 'react'
import '@telegram-apps/telegram-ui/dist/styles.css'
import { hasLocale } from 'next-intl'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import 'normalize.css/normalize.css'
import type { LocaleProps } from '@/shared/i18n'
import { routing } from '@/shared/i18n'
import type { ParamsProps } from '@/shared/lib/dom'
import { Providers } from '../providers/Providers'
import '../styles/globals.css'

export const AppLayout = memo(async function AppLayout({
    children,
    params
}: PropsWithChildren<ParamsProps<LocaleProps>>): Promise<JSX.Element> {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

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
