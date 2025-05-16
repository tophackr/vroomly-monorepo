'use client'

import { useCallback } from 'react'
import type { FieldValues, UseFormWatch } from 'react-hook-form'
import debounce from 'lodash.debounce'
import { useWatchForm } from './useWatchForm'

interface UseDebounceFormProps<T extends FieldValues> {
    watch: UseFormWatch<T>
    onSubmit: (data: T) => void
    debounceTime?: number
}

export function useDebounceForm<T extends FieldValues>({
    watch,
    onSubmit,
    debounceTime = 1000
}: UseDebounceFormProps<T>): void {
    const debouncedSubmit = useCallback(
        (formData: T) => {
            const debouncedFn = debounce((data: T) => {
                onSubmit(data)
            }, debounceTime)
            debouncedFn(formData)
        },
        [debounceTime, onSubmit]
    )

    return useWatchForm({
        watch,
        callback: debouncedSubmit
    })
}
