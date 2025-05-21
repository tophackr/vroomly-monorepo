'use client'

import { useCallback, useTransition } from 'react'
import type { Locale } from '@/shared/i18n'
import { useActions } from '../hooks/useActions'
import { useAppSelector } from '../hooks/useAppSelector'
import { setCloudLocale } from './lang'
import { localeSliceActions, selectLocale } from './lang.slice'

export function useLocale() {
    const locale = useAppSelector(selectLocale)
    const { setLocale } = useActions(localeSliceActions)
    const [isLoading, startTransition] = useTransition()

    const setLocaleWithCloud = useCallback(
        (locale: Locale) => {
            startTransition(async () => {
                setLocale(locale)
                await setCloudLocale(locale)
            })
        },
        [setLocale]
    )

    return { locale, setLocale, setLocaleWithCloud, isLoading }
}
