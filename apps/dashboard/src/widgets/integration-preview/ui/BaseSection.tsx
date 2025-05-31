'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Cell, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useInteractionContext } from '@/entities/interaction'
import { useIntlDateTime } from '@/shared/i18n'
import { IconCell } from '@/shared/ui/cell'

interface BaseSectionProps {
    title: string
}

export const BaseSection = memo(function BaseSection({
    title
}: BaseSectionProps): JSX.Element {
    const t = useTranslations('CarActionForm')

    const {
        interaction: { date, mileage, amount, engineHours, description }
    } = useInteractionContext()

    const intlDateTime = useIntlDateTime()

    return (
        <>
            <Section
                header={<Section.Header large={true}>{title}</Section.Header>}
            >
                <IconCell
                    icon={'Calendar'}
                    bgColor={'OrangeRed'}
                    subhead={t('date')}
                >
                    {intlDateTime.format(new Date(date))}
                </IconCell>
                <IconCell
                    icon={'Milestone'}
                    bgColor={'MediumPurple'}
                    subhead={t('mileage')}
                >
                    {mileage}
                </IconCell>

                {amount && (
                    <IconCell
                        icon={'LandPlot'}
                        bgColor={'Orange'}
                        subhead={t('amount')}
                    >
                        {amount}
                    </IconCell>
                )}

                {engineHours && (
                    <IconCell
                        icon={'Clock'}
                        bgColor={'MediumPurple'}
                        subhead={t('engine_hours')}
                    >
                        {engineHours}
                    </IconCell>
                )}
            </Section>

            {description && (
                <Section>
                    <Cell subhead={t('description')}>{description}</Cell>
                </Section>
            )}
        </>
    )
})
