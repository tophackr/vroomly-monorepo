'use client'

import type { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import { FuelType } from '@vroomly/prisma'
import { IconContainer, Input, Section, Select } from 'tmaui'
import { useTranslations } from 'use-intl'
import { Icon } from '@/shared/ui/icon'
import { inputErrorStatus } from '@/shared/ui/when'
import type { CarFuelForm } from './types'

export function FuelSection(): JSX.Element {
    const t = useTranslations('CarInfo')

    const {
        register,
        formState: { errors }
    } = useFormContext<CarFuelForm>()

    return (
        <Section header={t('sections.fuel')}>
            <Input
                type={'number'}
                before={
                    <IconContainer color='Orange'>
                        <Icon name='Fuel' />
                    </IconContainer>
                }
                header={t('fuel.capacity')}
                placeholder={t('fuel.capacity')}
                {...inputErrorStatus(errors.fuelCapacity)}
                {...register('fuelCapacity', {
                    valueAsNumber: true,
                    min: { value: 0, message: t('errors.fuel_capacity_min') }
                })}
            />
            <Select
                before={
                    <IconContainer color='MediumPurple'>
                        <Icon name={'Weight'} />
                    </IconContainer>
                }
                header={t('fuel.title')}
                {...register('fuelType', { required: true })}
            >
                {Object.values(FuelType).map(fuel => (
                    <option
                        key={fuel}
                        value={fuel}
                    >
                        {t(`fuel.type.${fuel}`)}
                    </option>
                ))}
            </Select>
        </Section>
    )
}
