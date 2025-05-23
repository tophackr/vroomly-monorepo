'use server'

import { cookies } from 'next/headers'
import { defaultLocale } from './config'
import type { Locale } from './types'

const cookieName = 'NEXT_INTL'

export async function getCookieLocale() {
    const cookie = await cookies()
    return cookie.get(cookieName)?.value || defaultLocale
}

export async function setCookieLocale(locale: Locale) {
    const cookie = await cookies()
    cookie.set(cookieName, locale)
}
