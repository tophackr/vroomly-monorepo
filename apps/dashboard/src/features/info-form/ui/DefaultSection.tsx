'use client'

import type { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Section, Switch } from '@telegram-apps/telegram-ui'
import { IconCell } from '@/shared/ui/cell'
import type { CarDefaultFrom } from './types'

export function DefaultSection(): JSX.Element {
    const t = useTranslations('CarInfo')

    const { control } = useFormContext<CarDefaultFrom>()

    return (
        <Section>
            <IconCell
                icon={'CircleCheck'}
                bgColor={'MediumPurple'}
                after={
                    <Controller
                        control={control}
                        name={'isDefault'}
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
                {t('default')}
            </IconCell>
        </Section>
    )
}
