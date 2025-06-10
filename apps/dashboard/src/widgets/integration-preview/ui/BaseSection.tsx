'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Cell, IconContainer, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useInteractionContext } from '@/entities/interaction'
import { useIntlDateTime } from '@/shared/i18n'
import { Icon } from '@/shared/ui/icon'

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
                <Cell
                    before={
                        <IconContainer color='OrangeRed'>
                            <Icon name='Calendar' />
                        </IconContainer>
                    }
                    subhead={t('date')}
                >
                    {intlDateTime.format(new Date(date))}
                </Cell>
                <Cell
                    before={
                        <IconContainer color='MediumPurple'>
                            <Icon name='Milestone' />
                        </IconContainer>
                    }
                    subhead={t('mileage')}
                >
                    {mileage}
                </Cell>

                {amount && (
                    <Cell
                        before={
                            <IconContainer color='Orange'>
                                <Icon name='LandPlot' />
                            </IconContainer>
                        }
                        subhead={t('amount')}
                    >
                        {amount}
                    </Cell>
                )}

                {engineHours && (
                    <Cell
                        before={
                            <IconContainer color='MediumPurple'>
                                <Icon name='Clock' />
                            </IconContainer>
                        }
                        subhead={t('engine_hours')}
                    >
                        {engineHours}
                    </Cell>
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
