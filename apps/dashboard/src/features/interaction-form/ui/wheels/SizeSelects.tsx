'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Section, Select } from '@telegram-apps/telegram-ui'
import { WheelType } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import type { InteractionDataForm } from '@/entities/interaction'
import { generateArray } from '../../model/generateArray'

export function SizeSelects(): JSX.Element {
    const t = useTranslations('CarActionForm.wheels')

    const { watch, control } = useFormContext<InteractionDataForm>()

    const watchWheelType = watch('wheelData.wheelType')

    const tiresWidth = useMemo(() => generateArray(125, 10, 29), [])
    const rimsWidth = useMemo(() => generateArray(4, 0.5, 17), [])
    const height = useMemo(() => generateArray(25, 5, 15), [])
    const diameter = useMemo(() => generateArray(12, 1, 15), [])

    return (
        <Section header={t('size')}>
            <Controller
                name={'wheelData.width'}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                        value={value ?? ''}
                        onChange={e => {
                            const { value } = e.target
                            return onChange(value === '' ? null : Number(value))
                        }}
                        onBlur={onBlur}
                    >
                        <option
                            value={''}
                            disabled
                        >
                            {t('width')}
                        </option>

                        {(watchWheelType === WheelType.tire
                            ? tiresWidth
                            : rimsWidth
                        ).map(i => (
                            <option
                                key={i}
                                value={i}
                            >
                                {i}
                            </option>
                        ))}
                    </Select>
                )}
            />

            {watchWheelType === WheelType.tire && (
                <Controller
                    name={'wheelData.height'}
                    control={control}
                    render={({ field: { value, onChange, onBlur } }) => (
                        <Select
                            value={value ?? ''}
                            onChange={e => {
                                const { value } = e.target
                                return onChange(
                                    value === '' ? null : Number(value)
                                )
                            }}
                            onBlur={onBlur}
                        >
                            <option
                                value={''}
                                disabled
                            >
                                {t('height')}
                            </option>

                            {height.map(i => (
                                <option
                                    key={i}
                                    value={i}
                                >
                                    {i}
                                </option>
                            ))}
                        </Select>
                    )}
                />
            )}

            <Controller
                name={'wheelData.diameter'}
                control={control}
                render={({ field: { value, onChange, onBlur } }) => (
                    <Select
                        value={value ?? ''}
                        onChange={e => {
                            const { value } = e.target
                            return onChange(value === '' ? null : Number(value))
                        }}
                        onBlur={onBlur}
                    >
                        <option
                            value={''}
                            disabled
                        >
                            {t('diameter')}
                        </option>

                        {diameter.map(i => (
                            <option
                                key={i}
                                value={i}
                            >
                                R{i}
                            </option>
                        ))}
                    </Select>
                )}
            />
        </Section>
    )
}
