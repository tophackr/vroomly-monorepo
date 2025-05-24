import {
    getCloudStorageItem,
    isCloudStorageSupported,
    setCloudStorageItem
} from '@telegram-apps/sdk-react'
import type { Locale } from './types'

// eslint-disable-next-line @typescript-eslint/naming-convention
const ITEM_NAME = 'NEXT_INTL'

export async function getStorageLocale(): Promise<string | undefined> {
    if (isCloudStorageSupported()) {
        const item = await getCloudStorageItem(ITEM_NAME)
        // eslint-disable-next-line no-console
        console.log('cloud storage', item)
        return item
    }

    return
}

export async function setStorageLocale(locale: Locale): Promise<void> {
    if (isCloudStorageSupported()) {
        await setCloudStorageItem(ITEM_NAME, locale)
    }
}
