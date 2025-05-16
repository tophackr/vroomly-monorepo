'use client'

import type { JSX } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Cell, Multiselectable, Section } from '@telegram-apps/telegram-ui'
import { useCarContext } from '@/entities/car'
import type { InteractionDataForm } from '@/entities/interaction'
import { isRepair, useFindAllRepairsQuery } from '@/entities/repair'
import { useLogger } from '@/shared/model'

export function RepairSection(): JSX.Element {
    const t = useTranslations('CarActionForm')
    const { error: logError } = useLogger()

    const { register } = useFormContext<InteractionDataForm>()

    const { car } = useCarContext()
    const { data, isLoading, isError, error } = useFindAllRepairsQuery({
        carId: car.id
    })

    if (isError) logError('RepairSection', error)

    // todo: loading repairs
    if (isLoading) return <>Loading repairs...</>

    return (
        <Section header={t('repair_work.title')}>
            {data?.map(({ id, option }) => (
                <Cell
                    key={id}
                    Component={'label'}
                    before={
                        <Multiselectable
                            value={id}
                            {...register('repairData.ids', {
                                required: t('errors.repair_work_required')
                            })}
                        />
                    }
                >
                    {isRepair(option)
                        ? t(`repair_work.options.${option}`)
                        : option}
                </Cell>
            ))}
        </Section>
    )
}
