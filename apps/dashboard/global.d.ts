import { Translation, routing } from '@/shared/i18n'

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: Translation
    }
}