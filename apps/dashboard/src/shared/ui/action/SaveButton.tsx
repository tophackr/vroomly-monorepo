'use client'

import type { JSX } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'use-intl'
import { useFormError } from '@/shared/ui/form'
import type { MainButtonProps } from '@/shared/ui/tma'
import { MainButton } from '@/shared/ui/tma'

type SaveMainButtonProps = Omit<
    MainButtonProps,
    'isLoaderVisible' | 'isEnabled' | 'onClick'
>

interface SaveButtonProps<T extends FieldValues> {
    disabled?: boolean
    onClick: (data: T) => void
}

export function SaveButton<T extends FieldValues>({
    text,
    disabled = false,
    onClick,
    ...props
}: SaveButtonProps<T> & SaveMainButtonProps): JSX.Element {
    const t = useTranslations('Common')

    const { handleSubmit } = useFormContext<T>()

    const { onErrorCallback } = useFormError()

    return (
        <MainButton
            text={text ?? t('save')}
            isLoaderVisible={disabled}
            isEnabled={!disabled}
            onClick={handleSubmit(onClick, onErrorCallback)}
            {...props}
        />
    )
}
