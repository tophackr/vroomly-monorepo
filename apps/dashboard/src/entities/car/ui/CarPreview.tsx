import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { Placeholder } from '@telegram-apps/telegram-ui'
import type { CarMileageProps, CarProps } from '../model/props'
import { CarAvatar } from './CarAvatar'
import { useIntlCarUnit } from './hooks/useIntlCarUnit'

export const CarPreview = memo(function CarPreview({
    car: { odometerUnits, brand, model },
    mileage
}: CarProps & CarMileageProps): JSX.Element {
    const t = useTranslations('Car')
    const intlMileage = useIntlCarUnit(mileage, odometerUnits)

    return (
        <Placeholder
            header={`${brand} ${model ?? ''}`}
            description={`${t('mileage')}: ${intlMileage}`}
        >
            <CarAvatar
                name={brand}
                size={96}
            />
        </Placeholder>
    )
})
