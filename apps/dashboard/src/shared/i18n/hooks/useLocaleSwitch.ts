'use client'

import { useCallback, useTransition } from 'react'
import { useIntlContext } from '../I18nProvider'
import type { Locale } from '../types'

export function useLocaleSwitch() {
    const { setLocale } = useIntlContext()
    const [isLoading, startTransition] = useTransition()

    const switchLocale = useCallback(
        (locale: Locale) => {
            startTransition(() => {
                setLocale(locale)
            })
        },
        [setLocale]
    )

    return { switchLocale, isLoading }
}
