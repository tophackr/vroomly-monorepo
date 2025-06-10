import type { JSX } from 'react'
import { InteractionType } from '@vroomly/prisma'
import { useTranslations } from 'use-intl'
import { actionsRoute } from '@/entities/interaction'
import { renderLink, type RenderLinkProps } from '@/shared/ui/cell'
import type { ContentsProps } from './props'

export function FinanceContents({ id }: ContentsProps): JSX.Element[] {
    const t = useTranslations('CarCategoryName')
    const route = actionsRoute(id)

    const financeLinks: RenderLinkProps[] = [
        {
            title: t(InteractionType.insurance),
            icon: 'Ambulance',
            color: 'OrangeRed',
            href: route.new(InteractionType.insurance)
        },
        {
            title: t(InteractionType.tax),
            icon: 'Calculator',
            color: 'MediumPurple',
            href: route.new(InteractionType.tax)
        },
        {
            title: t(InteractionType.state_inspection),
            icon: 'LoaderPinwheel',
            color: 'DodgerBlue',
            href: route.new(InteractionType.state_inspection)
        },
        {
            title: t(InteractionType.fine),
            icon: 'CircleDollarSign',
            color: 'Orange',
            href: route.new(InteractionType.fine)
        },
        {
            title: t(InteractionType.car_purchase),
            icon: 'Container',
            color: 'LimeGreen',
            href: route.new(InteractionType.car_purchase)
        },
        {
            title: t(InteractionType.loan_repayment),
            icon: 'Captions',
            color: 'DeepPink',
            href: route.new(InteractionType.loan_repayment)
        },
        {
            title: t(InteractionType.leasing),
            icon: 'NotepadText',
            color: 'SlateGray',
            href: route.new(InteractionType.leasing)
        }
    ]

    return financeLinks.map(link => renderLink(link))
}
