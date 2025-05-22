import type { LocaleProps } from '@/shared/i18n'
import { routing } from '@/shared/i18n'

export function generateStaticParams(): LocaleProps[] {
    return routing.locales.map(locale => ({ locale }))
}
