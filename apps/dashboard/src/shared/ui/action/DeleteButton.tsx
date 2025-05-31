'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import type { ButtonCellProps } from 'tmaui'
import { ButtonCell, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
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
