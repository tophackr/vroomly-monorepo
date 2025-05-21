'use client'

import type { PropsWithChildren } from 'react'
import { memo, useEffect, useState } from 'react'
import type { Locale } from '@/shared/i18n'
import { useEffectOnce } from '@/shared/lib/dom'
import { useLocale } from '@/shared/lib/store'
import { Loader } from '@/shared/ui'
import { useLazyFindOneUserQuery } from '../api/user.api'

export const UserInitProvider = memo(function UserInitProvider({
    children
}: PropsWithChildren) {
    const { setLocaleWithCloud } = useLocale()

    const [findUser, { isLoading }] = useLazyFindOneUserQuery()
    const [isFindLoading, setIsFindLoading] = useState(true)

    useEffectOnce(async () => {
        const { data } = await findUser()

        if (data) {
            setLocaleWithCloud(data.language as Locale)
        }
    })

    useEffect(() => {
        if (!isLoading) {
            setIsFindLoading(false)
        }
    }, [isLoading, setLocaleWithCloud])

    if (isFindLoading) return <Loader />

    return children
})
