'use client'

import type { PropsWithChildren } from 'react'
import { memo, useEffect, useRef } from 'react'
import { initDataUser } from '@telegram-apps/sdk-react'
import type { User } from '@vroomly/prisma'
import { hasLocale, useLocale } from 'use-intl'
import type { Locale } from '@/shared/i18n'
import { defaultLocale, locales, useLocaleSwitch } from '@/shared/i18n'
import { useLogger } from '@/shared/model'
import { useCreateUserMutation, useFindOneUserQuery } from '../api/user.api'

export const UserInitProvider = memo(function UserInitProvider({
    children
}: PropsWithChildren) {
    const initialized = useRef<User | null>(null)

    const { forceError } = useLogger()

    const { switchLocale } = useLocaleSwitch()
    const locale = useLocale()

    const { data, isError, error } = useFindOneUserQuery(undefined, {
        refetchOnMountOrArgChange: false,
        skip: initialized.current !== null
    })
    const [createUser] = useCreateUserMutation()

    useEffect(() => {
        if (initialized.current !== null) return

        if (data) {
            initialized.current = data
        }

        if (data && data.language !== locale) {
            switchLocale(data.language as Locale)
        }
    }, [data, locale, switchLocale])

    useEffect(() => {
        if (isError) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (error.status === 404) {
                const initUser = initDataUser()
                const locale = hasLocale(locales, initUser?.language_code)
                    ? initUser?.language_code
                    : defaultLocale

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
    }, [createUser, error, forceError, isError, switchLocale])

    return children
})
