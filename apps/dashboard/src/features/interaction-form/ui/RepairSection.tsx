'use client'

import type { JSX } from 'react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { Cell, Multiselectable, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import type { InteractionDataForm } from '@/entities/interaction'
import { isRepair, useFindAllRepairsQuery } from '@/entities/repair'
import { useLogger } from '@/shared/model'
import { statsRoute } from '@/shared/routes'
import { NothingPlaceholder } from '@/shared/ui/placeholder'
import { NothingCreateButton } from './NothingCreateButton'
import { SelectableSkeleton } from './SelectableSkeleton'

export function RepairSection(): JSX.Element {
    const t = useTranslations('CarActionForm')
    const { error: logError } = useLogger()

    const { register } = useFormContext<InteractionDataForm>()

    const { car } = useCarContext()
    const { data, isLoading, isError, error } = useFindAllRepairsQuery({
        carId: car.id
    })

    if (isError) logError('RepairSection', error)

    const filteredRepairs = useMemo(
        () => (data ?? []).filter(r => r.isVisible),
        [data]
    )

    if (isLoading) return <SelectableSkeleton />

    return (
        <Section header={t('repair_work.title')}>
            {filteredRepairs.length > 0 ? (
                filteredRepairs.map(({ id, option }) => (
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
                ))
            ) : (
                <NothingPlaceholder
                    description={t('nothing_placeholder.repair')}
                    action={
                        <NothingCreateButton
                            route={statsRoute.repairsEdit(car.id)}
                        />
                    }
                />
            )}
        </Section>
    )
}
