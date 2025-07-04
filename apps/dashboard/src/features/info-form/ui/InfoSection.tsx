'use client'

import type { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import { IconContainer, Input, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
import { valueAsStringOrNull } from '@/shared/lib/form'
import { Icon } from '@/shared/ui/icon'
import { inputErrorStatus } from '@/shared/ui/when'
import type { CarInfoForm } from './types'

export function InfoSection(): JSX.Element {
    const t = useTranslations('CarInfo')

    const {
        register,
        formState: { errors }
    } = useFormContext<CarInfoForm>()

    return (
        <Section
            header={t('sections.info')}
            className='row-span-2'
        >
            <Input
                before={
                    <IconContainer color='DodgerBlue'>
                        <Icon name='CarFront' />
                    </IconContainer>
                }
                header={t('brand')}
                placeholder={t('brand')}
                {...inputErrorStatus(errors.brand)}
                {...register('brand', { required: t('errors.brand_required') })}
            />
            <Input
                before={
                    <IconContainer color='LimeGreen'>
                        <Icon name='IdCard' />
                    </IconContainer>
                }
                header={t('model')}
                placeholder={t('model')}
                {...register('model', {
                    setValueAs: valueAsStringOrNull
                })}
            />
            <Input
                before={
                    <IconContainer color='SlateGray'>
                        <Icon name='Pencil' />
                    </IconContainer>
                }
                header={t('name')}
                placeholder={t('name')}
                {...register('name', {
                    setValueAs: valueAsStringOrNull
                })}
            />
            <Input
                type='number'
                before={
                    <IconContainer color='OrangeRed'>
                        <Icon name='Calendar' />
                    </IconContainer>
                }
                header={t('year')}
                placeholder={t('year')}
                {...inputErrorStatus(errors.year)}
                {...register('year', {
                    valueAsNumber: true,
                    min: { value: 1900, message: t('errors.year_min') },
                    max: { value: 2100, message: t('errors.year_max') },
                    minLength: {
                        value: 4,
                        message: t('errors.year_min_length')
                    },
                    maxLength: {
                        value: 4,
                        message: t('errors.year_max_length')
                    }
                })}
            />
        </Section>
    )
}
