'use client'

import type { JSX } from 'react'
import { memo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FileInput, Section, Textarea } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import type { InteractionDataForm } from '@/entities/interaction'
import { isMileageType } from '@/entities/interaction'
import { valueAsStringOrNull } from '@/shared/lib/form'
import { CheckCell } from '@/shared/ui/cell'
import { IconInput } from '@/shared/ui/form'
import { Icon } from '@/shared/ui/icon'
import { inputErrorStatus } from '@/shared/ui/when'

interface BaseSectionProps {
    title: string
}

export const BaseSection = memo(function BaseSection({
    title
}: BaseSectionProps): JSX.Element {
    const t = useTranslations('CarActionForm')

    const { car } = useCarContext()

    const [files, setFiles] = useState<FileList | null>(null)

    const {
        register,
        formState: { errors },
        getValues
    } = useFormContext<InteractionDataForm>()

    return (
        <>
            <Section
                header={<Section.Header large={true}>{title}</Section.Header>}
            >
                <IconInput
                    type={'date'}
                    icon={'Calendar'}
                    bgColor={'OrangeRed'}
                    placeholder={t('date')}
                    {...inputErrorStatus(errors.date)}
                    {...register('date', {
                        required: t('errors.date_required'),
                        setValueAs: (value: string) => new Date(value)
                    })}
                />
                <IconInput
                    type={'number'}
                    icon={'Milestone'}
                    bgColor={'MediumPurple'}
                    placeholder={t('mileage')}
                    {...inputErrorStatus(errors.mileage)}
                    {...register('mileage', { valueAsNumber: true })}
                />

                {isMileageType(getValues('type')) ? (
                    car.engineHoursEnabled && (
                        <IconInput
                            type={'number'}
                            icon={'Clock'}
                            bgColor={'MediumPurple'}
                            header={t('engine_hours')}
                            placeholder={t('engine_hours')}
                            {...register('engineHours', {
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: t('errors.engine_hours_min')
                                }
                            })}
                        />
                    )
                ) : (
                    <IconInput
                        type={'number'}
                        icon={'LandPlot'}
                        bgColor={'Orange'}
                        placeholder={t('amount')}
                        {...inputErrorStatus(errors.amount)}
                        {...register('amount', {
                            required: t('errors.amount_required'),
                            valueAsNumber: true,
                            min: {
                                value: 0,
                                message: t('errors.amount_min')
                            }
                        })}
                    />
                )}
            </Section>

            <Section>
                <Textarea
                    header={t('description')}
                    placeholder={t('description')}
                    {...register('description', {
                        setValueAs: valueAsStringOrNull
                    })}
                />
                <FileInput
                    label={t('files')}
                    multiple
                    onChange={event => setFiles(event.target.files)}
                />
            </Section>

            <Section>
                {files &&
                    [...files].map(file => (
                        <CheckCell
                            key={file.name}
                            after={
                                <Icon
                                    name={'CircleX'}
                                    className={'text-destructive'}
                                />
                            }
                            subtitle={`${file.size} bytes`}
                        >
                            {file.name}
                        </CheckCell>
                    ))}
            </Section>
        </>
    )
})
