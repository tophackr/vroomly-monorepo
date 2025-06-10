import type { JSX } from 'react'
import { InteractionType } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import { actionsRoute } from '@/entities/interaction'
import { renderLink, type RenderLinkProps } from '@/shared/ui/cell'
import type { ContentsProps } from './props'

export function RepairContents({ id }: ContentsProps): JSX.Element[] {
    const t = useTranslations('CarCategoryName')
    const route = actionsRoute(id)

    const repairLinks: RenderLinkProps[] = [
        {
            title: t(InteractionType.maintenance),
            icon: 'Bike',
            color: 'MediumPurple',
            href: route.new(InteractionType.maintenance)
        },
        {
            title: t(InteractionType.tire_service),
            icon: 'Badge',
            color: 'LimeGreen',
            href: route.new(InteractionType.tire_service)
        },
        {
            title: t(InteractionType.repair),
            icon: 'Orbit',
            color: 'DodgerBlue',
            href: route.new(InteractionType.repair)
        },
        {
            title: t(InteractionType.part),
            icon: 'PocketKnife',
            color: 'SlateGray',
            href: route.new(InteractionType.part)
        },
        {
            title: t(InteractionType.purchase_wheels),
            icon: 'Aperture',
            color: 'Orange',
            href: route.new(InteractionType.purchase_wheels)
        },
        {
            title: t(InteractionType.tow_truck),
            icon: 'Caravan',
            color: 'OrangeRed',
            href: route.new(InteractionType.tow_truck)
        }
    ]

    return repairLinks.map(link => renderLink(link))
}
