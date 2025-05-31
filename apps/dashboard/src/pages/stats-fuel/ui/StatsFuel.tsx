'use client'

import {
    Caption,
    LargeTitle,
    Placeholder,
    Text
} from 'tmaui'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import {
    getIntlPartType,
    useIntlCurrency,
    useIntlNumber,
    useIntlUnit
} from '@/shared/i18n'
import { pagesRoute } from '@/shared/routes'
import { ListSection } from '@/shared/ui'
import { LinkCell } from '@/shared/ui/cell'
import { BackButton } from '@/shared/ui/tma'
import { fuelRoutes } from '../routes/fuel'
import { useBetweenDays } from './hooks/useBetweenDays'
import { useFuelData } from './hooks/useFuelData'
import { useFuelInteractions } from './hooks/useFuelInteractions'
import { calculateFuelConsumption } from './utils/calculateFuelConsumption'

export interface FuelLinkData {
    href: string
    count: string
    text: string
}

export function StatsFuel() {
    const t = useTranslations('StatsFuel')

    const fuelData = useFuelData()
    const { fuelPer100km, costPerKm, distancePerLiter, costPerLiter } =
        calculateFuelConsumption(fuelData)

    const fuelInteractions = useFuelInteractions()
    const calcDays = useBetweenDays()

    const { car } = useCarContext()
    const intlCurrency = useIntlCurrency()
    const intlUnitOdometer = useIntlUnit(car.odometerUnits)
    const intlUnitLiter = useIntlUnit('liter')
    const intlNumber = useIntlNumber({ maximumFractionDigits: 2 })

    const currencySymbol = getIntlPartType(intlCurrency, 'currency')
    const odometerSymbol = getIntlPartType(intlUnitOdometer, 'unit')
    const literSymbol = getIntlPartType(intlUnitLiter, 'unit')

    const linkData: FuelLinkData[] = [
        {
            href: fuelRoutes.consumption(car.id),
            count: intlUnitLiter.format(fuelPer100km),
            text: t('consumption_per', { value: intlUnitOdometer.format(100) })
        },
        {
            href: fuelRoutes.fuelConsumption(car.id),
            count: intlUnitLiter.format(fuelData.allFuel),
            text: t('fuel_consumption')
        },
        {
            href: fuelRoutes.costPerMileage(car.id),
            count: intlCurrency.format(costPerKm),
            text: t('cost_per_mileage', { value: intlUnitOdometer.format(1) })
        },
        {
            href: fuelRoutes.mileagePerUnit(car.id),
            count: intlUnitOdometer.format(distancePerLiter),
            text: t('mileage_per_unit', { value: intlUnitLiter.format(1) })
        },
        {
            href: fuelRoutes.costPerUnit(car.id),
            count: intlCurrency.format(costPerLiter),
            text: t('cost_per_unit', { value: intlUnitLiter.format(1) })
        }
    ]

    return (
        <ListSection
            sectionProps={{
                footer: 'Расход может отличаться от фактического, поскольку первая заправка не учитывается.'
            }}
        >
            <BackButton route={pagesRoute.carId(car.id)} />

            <div className={'grid grid-cols-2 justify-around'}>
                <Text className={'col-span-2 p-4 text-center'}>
                    {t('title')}
                </Text>
                <Placeholder
                    header={
                        <LargeTitle weight={'1'}>
                            {intlNumber.format(fuelPer100km)}
                        </LargeTitle>
                    }
                    description={`${literSymbol} / 100 ${odometerSymbol}`}
                    className={'py-0!'}
                />
                <Placeholder
                    header={
                        <LargeTitle weight={'1'}>
                            {intlNumber.format(costPerKm)}
                        </LargeTitle>
                    }
                    description={`${currencySymbol} / ${odometerSymbol}`}
                    className={'py-0!'}
                />
                <Caption className={'text-subtitle col-span-2 p-4 text-center'}>
                    {t('description', {
                        count: fuelInteractions.length ?? 0,
                        days: calcDays
                    })}
                </Caption>
            </div>

            {linkData.map(({ href, count, text }) => (
                <LinkCell
                    key={href}
                    href={href}
                    text={count}
                >
                    {text}
                </LinkCell>
            ))}
        </ListSection>
    )
}
