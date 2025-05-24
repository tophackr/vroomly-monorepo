'use server'

import { cookies } from 'next/headers'
import type { Locale } from './types'

// eslint-disable-next-line @typescript-eslint/naming-convention
const ITEM_NAME = 'NEXT_INTL'

export async function getCookieLocale(): Promise<string | undefined> {
    const cookie = await cookies()
    const item = cookie.get(ITEM_NAME)?.value
    // eslint-disable-next-line no-console
    console.log('cookie', item)
    return cookie.get(ITEM_NAME)?.value
}

export async function setCookieLocale(locale: Locale): Promise<void> {
    const cookie = await cookies()
    cookie.set(ITEM_NAME, locale)
}
