'use client'

import { useCallback, useTransition } from 'react'
import { useParams } from 'next/navigation'
import { usePathname, useRouter } from '../routing'
import type { Locale } from '../types'

export function useLocaleSwitch() {
    const [isLoading, startTransition] = useTransition()
    const params = useParams()
    const pathname = usePathname()
    const router = useRouter()

    const switchLocale = useCallback(
        (locale: Locale) => {
            startTransition(() => {
                router.replace(
                    // @ts-expect-error -- TypeScript will validate that only known `params`
                    // are used in combination with a given `pathname`. Since the two will
                    // always match for the current route, we can skip runtime checks.
                    { pathname, params },
                    { locale }
                )
            })
        },
        [params, pathname, router]
    )

    return { switchLocale, isLoading }
}
