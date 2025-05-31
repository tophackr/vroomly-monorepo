'use client'

import type { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import { Section } from 'tmaui'
import { FuelType } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import { IconInput, IconSelect } from '@/shared/ui/form'
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
            <IconInput
                type={'number'}
                icon={'Fuel'}
                bgColor={'Orange'}
                header={t('fuel.capacity')}
                placeholder={t('fuel.capacity')}
                {...inputErrorStatus(errors.fuelCapacity)}
                {...register('fuelCapacity', {
                    valueAsNumber: true,
                    min: { value: 0, message: t('errors.fuel_capacity_min') }
                })}
            />
            <IconSelect
                icon={'Weight'}
                bgColor={'MediumPurple'}
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
            </IconSelect>
        </Section>
    )
}
