'use client'

import type { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Cell, Multiselectable, Section } from '@telegram-apps/telegram-ui'
import { useCarContext } from '@/entities/car'
import type { InteractionDataForm } from '@/entities/interaction'
import { isPart, useFindAllPartsQuery } from '@/entities/part'
import { useLogger } from '@/shared/model'

export function PartsSection(): JSX.Element {
    const t = useTranslations('CarActionForm')
    const { error: logError } = useLogger()

    const { register } = useFormContext<InteractionDataForm>()

    const { car } = useCarContext()
    const { data, isLoading, isError, error } = useFindAllPartsQuery({
        carId: car.id
    })

    if (isError) logError('PartsSection', error)

    // todo: loading parts
    if (isLoading) return <>Loading parts...</>

    return (
        <Section header={t('parts_work.title')}>
            {data?.map(({ id, option }) => (
                <Cell
                    key={id}
                    Component={'label'}
                    before={
                        <Multiselectable
                            value={id}
                            {...register('partData.ids', {
                                required: t('errors.repair_work_required')
                            })}
                        />
                    }
                >
                    {isPart(option)
                        ? t(`parts_work.options.${option}`)
                        : option}
                </Cell>
            ))}
        </Section>
    )
}
