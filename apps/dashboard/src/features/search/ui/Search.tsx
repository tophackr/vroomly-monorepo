'use client'

import type { JSX } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Tappable } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useDebounceForm } from '@/shared/ui/form'
import { Icon } from '@/shared/ui/icon'
import type { SearchForm, SearchProps } from './types'

export function Search({
    onSearch,
    debounceTime = 444
}: SearchProps): JSX.Element {
    const t = useTranslations('Search')

    const { register, reset, watch } = useForm<SearchForm>()

    const onClear = useCallback(() => {
        reset({
            value: ''
        })
    }, [reset])

    useDebounceForm({ watch, onSubmit: onSearch, debounceTime })

    return (
        <Input
            after={
                <Tappable
                    Component='div'
                    className={'flex'}
                    onClick={onClear}
                >
                    <Icon
                        name={'X'}
                        className={'text-hint'}
                    />
                </Tappable>
            }
            placeholder={t('placeholder')}
            {...register('value')}
        />
    )
}
