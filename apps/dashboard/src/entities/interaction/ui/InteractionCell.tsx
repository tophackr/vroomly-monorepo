'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { Badge, Cell } from 'tmaui'
import { useFormatter, useTranslations } from 'use-intl'
import type { CarProps } from '@/entities/car/@x/interaction'
import { useIntlCarUnit } from '@/entities/car/@x/interaction'
import { useIntlCurrency, useIntlTimeAgo } from '@/shared/i18n'
import { daysAfterToday } from '@/shared/lib/date'
import { useButtonClick } from '@/shared/lib/dom'
import { isMileageType } from '../model/isType'
import type { InteractionProps } from '../model/props'
import { actionsRoute } from '../routes/actions'

export const InteractionCell = memo(function InteractionCell({
    interaction: { id, type, description, amount, engineHours, date, mileage },
    car
}: InteractionProps & CarProps): JSX.Element {
    const t = useTranslations('CarCategoryName')

    const currency = useIntlCurrency().format(amount ?? 0)
    const mileageFormat = useIntlCarUnit(mileage ?? 0, car.odometerUnits)
    const dateTime = useIntlTimeAgo(new Date(date))
    const isToday = daysAfterToday(new Date(date)) + 1 === 0

    const format = useFormatter()

    const props = useButtonClick({
        route: actionsRoute(car.id).details(type, id)
    })

    const title = isMileageType(type) ? mileageFormat : currency

    return (
        <Cell
            after={dateTime}
            subhead={t(type)}
            subtitle={
                isMileageType(type)
                    ? engineHours &&
                      `${format.number(engineHours, { maximumFractionDigits: 2 })} ч`
                    : mileageFormat
            }
            description={description}
            titleBadge={
                Boolean(title) && isToday ? <Badge type={'dot'} /> : <></>
            }
            multiline={true}
            {...props}
        >
            {title}
        </Cell>
    )
})
