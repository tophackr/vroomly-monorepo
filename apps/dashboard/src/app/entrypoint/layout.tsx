import type { JSX, PropsWithChildren } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@telegram-apps/telegram-ui/dist/styles.css'
import 'normalize.css/normalize.css'
import { I18nProvider } from '@/shared/i18n'
import { Providers } from '../providers/Providers'
import '../styles/globals.css'

export function AppLayout({ children }: PropsWithChildren): JSX.Element {
    return (
        <html lang={'en'}>
            <body>
                <I18nProvider>
                    <div id={'app'}>
                        <Providers>{children}</Providers>

                        <SpeedInsights />
                    </div>
                </I18nProvider>
            </body>
        </html>
    )
}
