'use client'

import { useCallback, useTransition } from 'react'
import { setCookieLocale } from '../cookie'
import { setStorageLocale } from '../storage'
import type { Locale } from '../types'

export function useLocaleSwitch() {
    const [isLoading, startTransition] = useTransition()

    const switchLocale = useCallback((locale: Locale) => {
        startTransition(async () => {
            await setStorageLocale(locale)
            await setCookieLocale(locale)
        })
    }, [])

    return { switchLocale, isLoading }
}
