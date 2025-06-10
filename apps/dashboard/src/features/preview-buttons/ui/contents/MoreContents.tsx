import type { JSX } from 'react'
import { InteractionType } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import { actionsRoute } from '@/entities/interaction'
import { renderLink, type RenderLinkProps } from '@/shared/ui/cell'
import type { ContentsProps } from './props'

export function MoreContents({ id }: ContentsProps): JSX.Element[] {
    const t = useTranslations('CarCategoryName')
    const route = actionsRoute(id)

    const moreLinks: RenderLinkProps[] = [
        {
            title: t(InteractionType.car_purchases),
            icon: 'Gift',
            color: 'LimeGreen',
            href: route.new(InteractionType.car_purchases)
        },
        {
            title: t(InteractionType.tuning),
            icon: 'CircuitBoard',
            color: 'DodgerBlue',
            href: route.new(InteractionType.tuning)
        },
        {
            title: t(InteractionType.driver_salary),
            icon: 'Coins',
            color: 'Orange',
            href: route.new(InteractionType.driver_salary)
        }
    ]

    return moreLinks.map(link => renderLink(link))
}
