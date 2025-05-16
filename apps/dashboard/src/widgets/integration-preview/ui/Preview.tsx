'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { List } from '@telegram-apps/telegram-ui'
import type { CategoryProps } from '@/entities/interaction'
import {
    isFuelType,
    isPartType,
    isRepairType,
    isWheelType
} from '@/entities/interaction'
import { BaseSection } from './BaseSection'
import { FuelSection } from './FuelSection'
import { InteractionEditButton } from './InteractionEditButton'
import { PartsSection } from './PartsSection'
import { RepairSection } from './RepairSection'
import { WheelsSection } from './WheelsSection'

export const Preview = memo(function Preview({
    category
}: CategoryProps): JSX.Element {
    const t = useTranslations('CarCategoryName')

    return (
        <List>
            <InteractionEditButton />

            <BaseSection title={t(category)} />

            {isFuelType(category) && <FuelSection />}

            {isRepairType(category) && <RepairSection />}

            {isPartType(category) && <PartsSection />}

            {isWheelType(category) && <WheelsSection />}
        </List>
    )
})
