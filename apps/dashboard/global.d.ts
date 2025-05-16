import { Translation } from '@/shared/i18n'

declare global {
    // Use type safe message keys with `next-intl`
    type IntlMessages = Translation
}
