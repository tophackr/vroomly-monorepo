'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input, Section, Slider, Text } from 'tmaui'
import { useTranslations } from 'use-intl'
import type { InteractionDataForm } from '@/entities/interaction'
import { Icon } from '@/shared/ui/icon'
import { useRefuel } from './hooks/useRefuel'
import type { FuelCapacityProps } from './props'

export const BeforeRefueling = memo(function BeforeRefueling({
    fuelCapacity
}: FuelCapacityProps): JSX.Element {
    const t = useTranslations('CarActionForm')

    const {
        register,
        formState: { errors }
    } = useFormContext<InteractionDataForm>()

    const { beforeRefuel, onBeforeChange } = useRefuel(fuelCapacity)

    return (
        <Section header={t('fuel.before_refueling')}>
            <Input
                {...(errors.fuelData?.beforeRefueling
                    ? { status: 'error' }
                    : {})}
                type='number'
                after={
                    <Text className='text-hint flex items-center gap-x-1'>
                        {beforeRefuel}
                        <Icon
                            name='Percent'
                            size={16}
                        />
                    </Text>
                }
                {...register('fuelData.beforeRefueling', {
                    valueAsNumber: true,
                    min: { value: 0, message: t('errors.before_refueling_min') }
                })}
            />
            <Slider
                after={
                    <Icon
                        name='Percent'
                        size={20}
                        className='text-subtitle'
                    />
                }
                value={beforeRefuel}
                onChange={onBeforeChange}
            />
        </Section>
    )
})
