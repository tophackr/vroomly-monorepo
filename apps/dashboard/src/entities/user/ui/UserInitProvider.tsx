'use client'

import type { PropsWithChildren } from 'react'
import { memo, useEffect, useRef } from 'react'
import { hasLocale, useLocale } from 'next-intl'
import { initDataUser } from '@telegram-apps/sdk-react'
import type { Locale } from '@/shared/i18n'
import { routing, useLocaleSwitch } from '@/shared/i18n'
import { useLogger } from '@/shared/model'
import { useCreateUserMutation, useFindOneUserQuery } from '../api/user.api'

export const UserInitProvider = memo(function UserInitProvider({
    children
}: PropsWithChildren) {
    const initialized = useRef(false)

    const { forceError } = useLogger()

    const { switchLocale } = useLocaleSwitch()
    const locale = useLocale()

    const { data, isError, error } = useFindOneUserQuery(undefined, {
        refetchOnMountOrArgChange: false,
        skip: initialized.current
    })
    const [createUser] = useCreateUserMutation()

    useEffect(() => {
        if (initialized.current) return
        initialized.current = true

        if (data && data.language !== locale) {
            switchLocale(data.language as Locale)
        }

        if (isError) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (error.status === 404) {
                const initUser = initDataUser()
                const locale = hasLocale(
                    routing.locales,
                    initUser?.language_code
                )
                    ? initUser?.language_code
                    : routing.defaultLocale

                void createUser({
                    body: { language: locale }
                }).then(({ data: creationData, error: creationError }) => {
                    if (creationData && creationData.language !== locale) {
                        switchLocale(creationData.language as Locale)
                    }
                    if (creationError) {
                        forceError('UserInitProvider.createUser', error)
                    }
                })
            } else {
                forceError('UserInitProvider.findUser', error)
            }
        }
    }, [createUser, data, error, forceError, isError, locale, switchLocale])

    return children
})
