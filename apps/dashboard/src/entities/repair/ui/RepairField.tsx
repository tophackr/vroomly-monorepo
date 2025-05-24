'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Cell, Input, Section, Switch } from '@telegram-apps/telegram-ui'
import { useTranslations } from 'use-intl'
import { inputErrorStatus } from '@/shared/ui/when'
import { isRepair } from '../model/isRepair'
import type { RepairProps, RepairsProps } from '../model/props'

export const RepairField = memo(function RepairField({
    repair: { option }
}: RepairProps): JSX.Element {
    const t = useTranslations('Repair')

    const {
        register,
        formState: { errors },
        control
    } = useFormContext<RepairsProps>()
    const { fields } = useFieldArray({
        control,
        name: 'repairs'
    })

    const fieldIndex = fields.findIndex(f => f.option === option)

    return (
        <Section header={isRepair(option) ? t(`options.${option}`) : option}>
            <Input
                type={'number'}
                placeholder={t('mileage')}
                {...inputErrorStatus(errors.repairs?.[fieldIndex]?.mileage)}
                {...register(`repairs.${fieldIndex}.mileage`, {
                    valueAsNumber: true,
                    min: { value: 0, message: t('errors.interval_min') }
                })}
            />
            <Input
                type={'number'}
                placeholder={t('days')}
                {...inputErrorStatus(errors.repairs?.[fieldIndex]?.days)}
                {...register(`repairs.${fieldIndex}.days`, {
                    valueAsNumber: true,
                    min: { value: 0, message: t('errors.interval_min') }
                })}
            />
            <Cell
                after={
                    <Controller
                        control={control}
                        name={`repairs.${fieldIndex}.isVisible`}
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
                {t('visible')}
            </Cell>
        </Section>
    )
})
