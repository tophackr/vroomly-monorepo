import { Translation, locales } from '@/shared/i18n'

declare module 'use-intl' {
    interface AppConfig {
        Locale: (typeof locales)[number];
        Messages: Translation
    }
}