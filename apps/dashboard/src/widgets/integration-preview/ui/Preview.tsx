'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { List } from 'tmaui'
import { useTranslations } from 'use-intl'
import type { InteractionTypeProps } from '@/entities/interaction'
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
    type
}: InteractionTypeProps): JSX.Element {
    const t = useTranslations('CarCategoryName')

    return (
        <List>
            <InteractionEditButton />

            <BaseSection title={t(type)} />

            {isFuelType(type) && <FuelSection />}

            {isRepairType(type) && <RepairSection />}

            {isPartType(type) && <PartsSection />}

            {isWheelType(type) && <WheelsSection />}
        </List>
    )
})
