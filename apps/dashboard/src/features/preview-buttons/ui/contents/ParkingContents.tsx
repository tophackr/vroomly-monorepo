import type { JSX } from 'react'
import { InteractionType } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import { actionsRoute } from '@/entities/interaction'
import { renderLink, type RenderLinkProps } from '@/shared/ui/cell'
import type { ContentsProps } from './props'

export function ParkingContents({ id }: ContentsProps): JSX.Element[] {
    const t = useTranslations('CarCategoryName')
    const route = actionsRoute(id)

    const parkingLinks: RenderLinkProps[] = [
        {
            title: t(InteractionType.parking),
            icon: 'SquareParking',
            color: 'DodgerBlue',
            href: route.new(InteractionType.parking)
        },
        {
            title: t(InteractionType.toll_road),
            icon: 'TrafficCone',
            color: 'YellowGreen',
            href: route.new(InteractionType.toll_road)
        },
        {
            title: t(InteractionType.taxi),
            icon: 'CarTaxiFront',
            color: 'Orange',
            href: route.new(InteractionType.taxi)
        },
        {
            title: t(InteractionType.sober_driver),
            icon: 'ContactRound',
            color: 'MediumPurple',
            href: route.new(InteractionType.sober_driver)
        },
        {
            title: t(InteractionType.alarm_system),
            icon: 'Satellite',
            color: 'DeepPink',
            href: route.new(InteractionType.alarm_system)
        }
    ]

    return parkingLinks.map(link => renderLink(link))
}
