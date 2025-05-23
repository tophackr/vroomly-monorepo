'use client'

import { useCallback, useTransition } from 'react'
import { setCookieLocale } from '../cookie'
import type { Locale } from '../types'

export function useLocaleSwitch() {
    const [isLoading, startTransition] = useTransition()

    const switchLocale = useCallback((locale: Locale) => {
        startTransition(async () => {
            await setCookieLocale(locale)
        })
    }, [])

    return { switchLocale, isLoading }
}
