import { Translation, locales } from '@/shared/i18n'

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof locales)[number];
        Messages: Translation
    }
}