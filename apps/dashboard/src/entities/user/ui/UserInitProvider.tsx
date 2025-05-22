'use client'

import type { PropsWithChildren } from 'react'
import { memo, useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { initDataUser } from '@telegram-apps/sdk-react'
import type { Locale } from '@/shared/i18n'
import {
    defaultLocale,
    hasLocale,
    locales,
    useLocaleSwitch
} from '@/shared/i18n'
import { useEffectOnce } from '@/shared/lib/dom'
import { useLogger } from '@/shared/model'
import { Loader } from '@/shared/ui'
import { useCreateUserMutation, useLazyFindOneUserQuery } from '../api/user.api'

export const UserInitProvider = memo(function UserInitProvider({
    children
}: PropsWithChildren) {
    const { forceError } = useLogger()

    const { switchLocale } = useLocaleSwitch()
    const locale = useLocale()

    const [createUser, { isLoading: isCreateLoading }] = useCreateUserMutation()
    const [findUser, { isLoading: isLazyFindLoading }] =
        useLazyFindOneUserQuery()
    const [isFindLoading, setIsFindLoading] = useState(true)

    useEffectOnce(async () => {
        const user = await findUser().then(async ({ data, error }) => {
            if (data) return data

            if (error) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                if (error.status === 404) {
                    const user = initDataUser()
                    const locale = hasLocale(locales, user?.language_code)
                        ? user?.language_code
                        : defaultLocale
                    const { data: creationData } = await createUser({
                        body: { language: locale }
                    })
                    return creationData
                } else {
                    forceError('UserInitProvider', error)
                }
            }

            return
        })

        if (user && user.language !== locale) {
            switchLocale(user.language as Locale)
        }
    })

    useEffect(() => {
        if (!isLazyFindLoading && !isCreateLoading) {
            setIsFindLoading(false)
        }
    }, [isCreateLoading, isLazyFindLoading])

    if (isFindLoading) return <Loader />

    return children
})
