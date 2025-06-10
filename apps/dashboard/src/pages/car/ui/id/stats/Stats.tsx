'use client'

import type { JSX } from 'react'
import { List, Section } from 'tmaui'
import { useTranslations } from 'use-intl'
import { useCarContext } from '@/entities/car'
import { statsRoute } from '@/shared/routes'
import type { RenderLinkProps } from '@/shared/ui/cell'
import { renderLink } from '@/shared/ui/cell'
import { StatsCategory } from './types'

export function Stats(): JSX.Element {
    const t = useTranslations('StatsCategoryName')
    const { car } = useCarContext()

    const firstSection: RenderLinkProps[] = [
        {
            title: t(StatsCategory.cost),
            icon: 'ChartPie',
            color: 'Orange',
            href: statsRoute.cost(car.id)
        },
        {
            title: t(StatsCategory.list),
            icon: 'ListTodo',
            color: 'MediumPurple',
            href: statsRoute.list(car.id)
        },
        {
            title: t(StatsCategory.fuel),
            icon: 'ChartNoAxesCombined',
            color: 'DodgerBlue',
            href: statsRoute.fuel(car.id)
        }
    ]
    const secondSection: RenderLinkProps[] = [
        {
            title: t(StatsCategory.repairs),
            icon: 'Bolt',
            color: 'LimeGreen',
            href: statsRoute.repairs(car.id)
        },
        {
            title: t(StatsCategory.trip_cost),
            icon: 'Caravan',
            color: 'DeepPink',
            href: statsRoute['trip-cost'](car.id)
        }
    ]

    return (
        <List>
            <Section>{firstSection.map(link => renderLink(link))}</Section>
            <Section>{secondSection.map(link => renderLink(link))}</Section>
        </List>
    )
}
