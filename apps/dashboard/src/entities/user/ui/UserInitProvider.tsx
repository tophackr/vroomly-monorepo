'use client'

import type { PropsWithChildren } from 'react'
import { memo, useEffect, useState } from 'react'
import { useEffectOnce } from '@/shared/lib/dom'
import { Loader } from '@/shared/ui'
import { useLazyFindOneUserQuery } from '../api/user.api'

export const UserInitProvider = memo(function UserInitProvider({
    children
}: PropsWithChildren) {
    const [findUser, { isLoading }] = useLazyFindOneUserQuery()
    const [isFindLoading, setIsFindLoading] = useState(true)

    useEffectOnce(() => {
        void findUser()
    })

    useEffect(() => {
        if (!isLoading) {
            setIsFindLoading(false)
        }
    }, [isLoading])

    if (isFindLoading) return <Loader />

    return children
})
