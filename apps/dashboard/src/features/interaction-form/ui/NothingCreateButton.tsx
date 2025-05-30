'use client'

import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@telegram-apps/telegram-ui'
import { useButtonClick } from '@/shared/lib/dom'

interface NothingCreateButtonProps {
    route: string
}

export const NothingCreateButton = memo(function NothingCreateButton({
    route
}: NothingCreateButtonProps) {
    const t = useTranslations('Common')
    const props = useButtonClick({ route })

    return <Button {...props}>{t('create')}</Button>
})
