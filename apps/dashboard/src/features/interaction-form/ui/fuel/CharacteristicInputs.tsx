'use client'

import type { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input, Section, Select } from 'tmaui'
import { FuelGrade } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import type { InteractionDataForm } from '@/entities/interaction'

export function CharacteristicInputs(): JSX.Element {
    const t = useTranslations('CarActionForm.fuel')

    const { register } = useFormContext<InteractionDataForm>()

    return (
        <Section header={t('title')}>
            <Select
                header={t('grade.title')}
                {...register('fuelData.fuelGrade')}
            >
                {Object.values(FuelGrade).map(type => (
                    <option
                        key={type}
                        value={type}
                    >
                        {t(`grade.options.${type}`)}
                    </option>
                ))}
            </Select>

            <Input
                header={t('capacity')}
                placeholder={t('capacity')}
                {...register('fuelData.capacity', { valueAsNumber: true })}
            />
            <Input
                header={t('price')}
                placeholder={t('price')}
                {...register('fuelData.price', { valueAsNumber: true })}
            />
        </Section>
    )
}
