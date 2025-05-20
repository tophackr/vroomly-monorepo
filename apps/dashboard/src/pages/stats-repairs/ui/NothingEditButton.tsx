'use client'

import { memo } from 'react'
import { useTranslations } from 'next-intl'
import type { CarIdProps } from '@/entities/car'
import { useButtonClick } from '@/shared/lib/dom'
import { statsRoute } from '@/shared/routes'
import { MainButton } from '@/shared/ui/tma'

export const NothingEditButton = memo(function NothingEditButton({
    carId
}: CarIdProps) {
    const t = useTranslations('Common')
    const { disabled, onClick } = useButtonClick<void>({
        route: statsRoute.repairsEdit(carId)
    })

    return (
        <MainButton
            text={t('edit')}
            isLoaderVisible={disabled}
            isEnabled={!disabled}
            onClick={onClick}
        />
    )
})
