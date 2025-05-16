'use client'

import { useCallback } from 'react'
import type { FieldErrors, FieldValues } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { toast } from '@/shared/lib/toast'

interface UseFormErrorReturn<T extends FieldValues> {
    onErrorCallback: (errors: FieldErrors<T>) => void
}

export function useFormError<T extends FieldValues>(): UseFormErrorReturn<T> {
    const t = useTranslations('Common')

    const onErrorCallback = useCallback(
        (errors: FieldErrors<T>) => {
            if (Object.keys(errors).length === 0) {
                return
            }

            const errorMessages = Object.values(errors)
                .map(error => {
                    if (error && typeof error.message === 'string') {
                        return error.message
                    }
                    return null
                })
                .filter(Boolean)

            if (errorMessages.length > 0) {
                toast({
                    title: t('error'),
                    description: errorMessages
                })
            }
        },
        [t]
    )

    return { onErrorCallback }
}
