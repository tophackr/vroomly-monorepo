'use client'

import type { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OdometerUnits } from '@vroomly/prisma'
import { Cell, IconContainer, Input, Section, Select, Switch } from 'tmaui'
import { useTranslations } from 'use-intl'
import { Icon } from '@/shared/ui/icon'
import { inputErrorStatus } from '@/shared/ui/when'
import { useEngineHours } from './hooks/useEngineHours'
import { useOdometerUnits } from './hooks/useOdometerUnits'
import type { CarMileageForm } from './types'

export function MileageSection(): JSX.Element {
    const t = useTranslations('CarInfo')

    const {
        register,
        getValues,
        watch,
        control,
        formState: { errors }
    } = useFormContext<CarMileageForm>()

    const { odometerUnits, engineHoursEnabled } = getValues()

    const { unit } = useOdometerUnits(watch, odometerUnits)
    const { engineEnabled } = useEngineHours(watch, engineHoursEnabled)

    return (
        <Section header={t('sections.mileage')}>
            <Input
                type='number'
                before={
                    <IconContainer color='DodgerBlue'>
                        <Icon name='MousePointer2' />
                    </IconContainer>
                }
                header={t('mileage', {
                    unit: t(`odometer.units.${unit}`)
                })}
                placeholder={t('mileage', {
                    unit: t(`odometer.units.${unit}`)
                })}
                {...inputErrorStatus(errors.mileage)}
                {...register('mileage', {
                    required: t('errors.mileage_required'),
                    valueAsNumber: true,
                    min: { value: 0, message: t('errors.mileage_min') }
                })}
            />

            <Select
                before={
                    <IconContainer color='SlateGray'>
                        <Icon name='Milestone' />
                    </IconContainer>
                }
                header={t('odometer.title')}
                {...register('odometerUnits', { required: true })}
            >
                {Object.values(OdometerUnits).map(fuel => (
                    <option
                        key={fuel}
                        value={fuel}
                    >
                        {t(`odometer.units_full.${fuel}`)}
                    </option>
                ))}
            </Select>

            <Cell
                before={
                    <IconContainer color='LimeGreen'>
                        <Icon name='FolderClock' />
                    </IconContainer>
                }
                after={
                    <Controller
                        control={control}
                        name='engineHoursEnabled'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Switch
                                onBlur={onBlur}
                                onChange={() => onChange(!value)}
                                checked={value}
                            />
                        )}
                    />
                }
            >
                {t('engine_hours.enabled')}
            </Cell>

            {engineEnabled && (
                <Input
                    before={
                        <IconContainer color='MediumPurple'>
                            <Icon name='Clock' />
                        </IconContainer>
                    }
                    header={t('engine_hours.title')}
                    placeholder={t('engine_hours.title')}
                    {...register('engineHours', {
                        valueAsNumber: true,
                        min: { value: 0, message: t('errors.engine_hours_min') }
                    })}
                />
            )}
        </Section>
    )
}
