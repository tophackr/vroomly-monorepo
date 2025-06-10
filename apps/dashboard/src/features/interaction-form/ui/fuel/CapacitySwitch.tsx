'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Cell, Section, Switch } from 'tmaui'
import { useTranslations } from 'use-intl'
import type { InteractionDataForm } from '@/entities/interaction'
import { callMultiple } from '@/shared/lib/dom'
import { useRefuel } from './hooks/useRefuel'
import type { FuelCapacityProps } from './props'

export const CapacitySwitch = memo(function CapacitySwitch({
    fuelCapacity
}: FuelCapacityProps): JSX.Element {
    const t = useTranslations('CarActionForm.fuel')

    const { control } = useFormContext<InteractionDataForm>()

    const { onFullChange } = useRefuel(fuelCapacity)

    return (
        <Section>
            <Cell
                after={
                    <Controller
                        control={control}
                        name='fuelData.capacityFull'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Switch
                                onBlur={onBlur}
                                onChange={() =>
                                    callMultiple(
                                        onChange(!value),
                                        onFullChange(Boolean(value) ?? false)
                                    )
                                }
                                checked={value ?? false}
                            />
                        )}
                    />
                }
            >
                {t('capacity_full')}
            </Cell>
        </Section>
    )
})
