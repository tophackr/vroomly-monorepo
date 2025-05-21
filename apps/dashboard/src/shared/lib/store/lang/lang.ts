import {
    getCloudStorageItem,
    isCloudStorageSupported,
    setCloudStorageItem
} from '@telegram-apps/sdk-react'
import type { Locale } from '@/shared/i18n'
import { defaultLocale } from '@/shared/i18n'

const storageName = 'TG_LOCALE'

export async function getCloudLocale(): Promise<Locale> {
    if (!isCloudStorageSupported()) return defaultLocale

    const locale = await getCloudStorageItem(storageName)

    return (locale || defaultLocale) as Locale
}

export async function setCloudLocale(locale?: Locale) {
    if (isCloudStorageSupported()) {
        await setCloudStorageItem(storageName, locale || defaultLocale)
    }
}
