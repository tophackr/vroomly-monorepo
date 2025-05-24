'use client'

import type { JSX } from 'react'
import { Section } from '@telegram-apps/telegram-ui'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import { cx } from '@/shared/lib/dom'
import { isAppleClient } from '@/shared/ui/tma'
import { AfterRefueling } from './AfterRefueling'
import { BeforeRefueling } from './BeforeRefueling'
import { CapacitySwitch } from './CapacitySwitch'
import { CharacteristicInputs } from './CharacteristicInputs'

export function FuelSection(): JSX.Element {
    const t = useTranslations('CarActionForm.fuel')

    const { car } = useCarContext()

    const isApple = isAppleClient()

    return (
        <>
            <CharacteristicInputs />

            <Section.Header
                large={true}
                className={cx(isApple && '!pb-0 !pt-4 !mb-0')}
            >
                {t('amount_fuel_tank')}
            </Section.Header>

            <BeforeRefueling fuelCapacity={car?.fuelCapacity} />

            <AfterRefueling fuelCapacity={car?.fuelCapacity} />

            <CapacitySwitch fuelCapacity={car?.fuelCapacity} />
        </>
    )
}
