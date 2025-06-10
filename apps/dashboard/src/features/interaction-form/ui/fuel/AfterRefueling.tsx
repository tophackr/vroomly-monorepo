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

export const AfterRefueling = memo(function AfterRefueling({
    fuelCapacity
}: FuelCapacityProps): JSX.Element {
    const t = useTranslations('CarActionForm')

    const {
        register,
        formState: { errors }
    } = useFormContext<InteractionDataForm>()

    const { afterRefuel, onAfterChange } = useRefuel(fuelCapacity)

    return (
        <Section header={t('fuel.after_refueling')}>
            <Input
                {...(errors.fuelData?.afterRefueling
                    ? { status: 'error' }
                    : {})}
                after={
                    <Text className='text-hint flex items-center gap-x-1'>
                        {afterRefuel}
                        <Icon
                            name='Percent'
                            size={16}
                        />
                    </Text>
                }
                {...register('fuelData.afterRefueling', {
                    valueAsNumber: true,
                    min: { value: 0, message: t('errors.after_refueling_min') }
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
                value={afterRefuel}
                onChange={onAfterChange}
            />
        </Section>
    )
})
