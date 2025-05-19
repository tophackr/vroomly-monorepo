import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Section } from '@telegram-apps/telegram-ui'
import type { CarProps } from '@/entities/car/@x/interaction'
import { useIntlDateTime } from '@/shared/i18n'
import { LoadingPlaceholder, NothingPlaceholder } from '@/shared/ui/placeholder'
import { useListInteractions } from './hooks/useListInteractions'
import { InteractionCell } from './InteractionCell'
import { InteractionSumFooter } from './InteractionSumFooter'

interface InteractionListProps {
    slice?: number
}

export const InteractionList = memo(function InteractionList({
    car,
    slice
}: CarProps & InteractionListProps): JSX.Element {
    const t = useTranslations('Car')

    const intlDateTime = useIntlDateTime({
        year: 'numeric',
        month: 'long'
    })

    const { interactions, isLoading } = useListInteractions(car.id, slice)

    return (
        <>
            {Array.isArray(interactions) ? (
                <Section header={t('last_activity')}>
                    {isLoading ? (
                        <LoadingPlaceholder />
                    ) : interactions.length > 0 ? (
                        interactions.map(i => (
                            <InteractionCell
                                key={i.id}
                                interaction={i}
                                car={car}
                            />
                        ))
                    ) : (
                        <NothingPlaceholder />
                    )}
                </Section>
            ) : Object.keys(interactions).length > 0 ? (
                Object.keys(interactions).map(date => (
                    <Section
                        key={date}
                        header={intlDateTime.format(new Date(date))}
                        footer={
                            <InteractionSumFooter
                                interactions={interactions[date]!}
                            />
                        }
                    >
                        {interactions[date]!.map(i => (
                            <InteractionCell
                                key={i.id}
                                interaction={i}
                                car={car}
                            />
                        ))}
                    </Section>
                ))
            ) : (
                <Section>
                    <NothingPlaceholder />
                </Section>
            )}
        </>
    )
})
