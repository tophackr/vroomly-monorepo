'use client'

import type { JSX } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Cell, IconContainer, Section, Switch } from 'tmaui'
import { useTranslations } from 'use-intl'
import { Icon } from '@/shared/ui/icon'
import type { CarDefaultFrom } from './types'

export function DefaultSection(): JSX.Element {
    const t = useTranslations('CarInfo')

    const { control } = useFormContext<CarDefaultFrom>()

    return (
        <Section>
            <Cell
                before={
                    <IconContainer color='MediumPurple'>
                        <Icon name='CircleCheck' />
                    </IconContainer>
                }
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
            </Cell>
        </Section>
    )
}
