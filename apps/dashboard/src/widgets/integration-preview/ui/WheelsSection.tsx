'use client'

import type { JSX } from 'react'
import { useTranslations } from 'next-intl'
import { Cell, Section } from '@telegram-apps/telegram-ui'
import { WheelType } from '@vroomly/prisma'
import { useInteractionContext } from '@/entities/interaction'

export function WheelsSection(): JSX.Element {
    const t = useTranslations('CarActionForm.wheels')

    const {
        interaction: { wheelInteraction }
    } = useInteractionContext()
    const {
        wheelType,
        tireType,
        rimType,
        brand,
        model,
        width,
        height,
        diameter
    } = wheelInteraction!

    return (
        <>
            <Section
                header={<Section.Header large>{t(wheelType)}</Section.Header>}
            >
                {wheelType === WheelType.tire
                    ? tireType && (
                          <Cell subhead={t('seasonality.title')}>
                              {t(`seasonality.options.${tireType}`)}
                          </Cell>
                      )
                    : rimType && (
                          <Cell subhead={t('type.title')}>
                              {t(`type.options.${rimType}`)}
                          </Cell>
                      )}

                {brand && <Cell subhead={t('brand')}>{brand}</Cell>}
                {model && <Cell subhead={t('model')}>{model}</Cell>}
            </Section>

            {(width || height || diameter) && (
                <Section header={t('size')}>
                    {width && <Cell subhead={t('width')}>{width}</Cell>}
                    {height && <Cell subhead={t('height')}>{height}</Cell>}
                    {diameter && (
                        <Cell subhead={t('diameter')}>R{diameter}</Cell>
                    )}
                </Section>
            )}
        </>
    )
}
