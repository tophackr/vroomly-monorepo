'use client'

import type { JSX } from 'react'
import { memo } from 'react'
import { useTranslations } from 'next-intl'
import { List } from '@telegram-apps/telegram-ui'
import { InteractionCategory } from '@vroomly/prisma'
import type { CategoryProps } from '@/entities/interaction'
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

    const repairCategory: InteractionCategory[] = [
        InteractionCategory.maintenance,
        InteractionCategory.repair
    ]

    return (
        <List>
            <InteractionEditButton />

            <BaseSection title={t(category)} />

            {category === InteractionCategory.fuel && <FuelSection />}

            {repairCategory.includes(category) && <RepairSection />}

            {category === InteractionCategory.part && <PartsSection />}

            {category === InteractionCategory.purchase_wheels && (
                <WheelsSection />
            )}
        </List>
    )
})
