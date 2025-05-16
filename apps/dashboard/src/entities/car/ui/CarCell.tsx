import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Badge, Cell } from '@telegram-apps/telegram-ui'
import { useButtonClick } from '@/shared/lib/dom'
import { pagesRoute } from '@/shared/routes'
import type { CarProps } from '../model/props'
import { CarAvatar } from './CarAvatar'

export const CarCell = memo(function CarCell({ car }: CarProps): JSX.Element {
    const t = useTranslations('Car')

    const props = useButtonClick({ route: pagesRoute.carId(car.id) })

    return (
        <Cell
            after={
                car.isDefault && <Badge type={'number'}>{t('default')}</Badge>
            }
            before={
                <CarAvatar
                    name={car.brand}
                    size={28}
                />
            }
            subhead={car?.name}
            subtitle={car?.model}
            {...props}
        >
            {car.brand}
        </Cell>
    )
})
