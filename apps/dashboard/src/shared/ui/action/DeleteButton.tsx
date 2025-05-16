'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import type { ButtonCellProps } from '@telegram-apps/telegram-ui'
import { ButtonCell, Section } from '@telegram-apps/telegram-ui'
import { cx } from '@/shared/lib/dom'

export const DeleteButton = memo(function DeleteButton({
    className,
    ...props
}: ButtonCellProps): JSX.Element {
    const t = useTranslations('Common')

    return (
        <Section>
            <ButtonCell
                mode={'destructive'}
                className={cx('justify-center', className)}
                {...props}
            >
                {t('delete')}
            </ButtonCell>
        </Section>
    )
})
