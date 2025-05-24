'use client'

import type { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input, Section, Select } from '@telegram-apps/telegram-ui'
import { RimType, TireType, WheelType } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import type { InteractionDataForm } from '@/entities/interaction'
import { valueAsStringOrNull } from '@/shared/lib/form'
import { useWheelForm } from './hooks/useWheelForm'

export function InfoInputs(): JSX.Element {
    const t = useTranslations('CarActionForm.wheels')

    const { register, control } = useFormContext<InteractionDataForm>()

    const { wheelType } = useWheelForm()

    return (
        <Section header={t('title')}>
            <Select {...register('wheelData.wheelType', { required: true })}>
                <option value={WheelType.tire}>{t('tire')}</option>
                <option value={WheelType.rim}>{t('rim')}</option>
            </Select>

            {wheelType === WheelType.tire ? (
                <Controller
                    name={'wheelData.tireType'}
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <Select
                            value={value ?? ''}
                            onChange={e => {
                                const { value } = e.target
                                return onChange(value === '' ? null : value)
                            }}
                            onBlur={onBlur}
                        >
                            <option
                                value={''}
                                disabled
                            >
                                {t('seasonality.title')}
                            </option>

                            {Object.values(TireType).map(type => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {t(`seasonality.options.${type}`)}
                                </option>
                            ))}
                        </Select>
                    )}
                />
            ) : (
                <Controller
                    name={'wheelData.rimType'}
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <Select
                            value={value ?? ''}
                            onChange={e => {
                                const { value } = e.target
                                return onChange(value === '' ? null : value)
                            }}
                            onBlur={onBlur}
                        >
                            <option
                                value={''}
                                disabled
                            >
                                {t('type.title')}
                            </option>

                            {Object.values(RimType).map(type => (
                                <option
                                    key={type}
                                    value={type}
                                >
                                    {t(`type.options.${type}`)}
                                </option>
                            ))}
                        </Select>
                    )}
                />
            )}

            <Input
                placeholder={t('brand')}
                {...register('wheelData.brand', {
                    setValueAs: valueAsStringOrNull
                })}
            />
            <Input
                placeholder={t('model')}
                {...register('wheelData.model', {
                    setValueAs: valueAsStringOrNull
                })}
            />
        </Section>
    )
}
