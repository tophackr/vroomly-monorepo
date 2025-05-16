'use client'

import type { JSX } from 'react'
import { useTranslations } from 'next-intl'
import { useButtonClick } from '@/shared/lib/dom'
import { pagesRoute } from '@/shared/routes'
import { MainButton } from '@/shared/ui/tma'

export function CarCreateButton(): JSX.Element {
    const t = useTranslations('Home')

    const { disabled, onClick } = useButtonClick<void>({
        route: pagesRoute.carNew
    })

    return (
        <MainButton
            text={t('add')}
            isLoaderVisible={disabled}
            isEnabled={!disabled}
            onClick={onClick}
        />
    )
}
