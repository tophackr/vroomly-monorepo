import { InteractionType } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const repairData: KeyMenu<InteractionType>[] = [
    {
        name: InteractionType.maintenance,
        icon: 'Bike',
        bgColor: 'MediumPurple'
    },
    {
        name: InteractionType.tire_service,
        icon: 'Badge',
        bgColor: 'LimeGreen'
    },
    {
        name: InteractionType.repair,
        icon: 'Orbit',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionType.part,
        icon: 'PocketKnife',
        bgColor: 'SlateGray'
    },
    {
        name: InteractionType.purchase_wheels,
        icon: 'Aperture',
        bgColor: 'Orange'
    },
    {
        name: InteractionType.tow_truck,
        icon: 'Caravan',
        bgColor: 'OrangeRed'
    }
]

export function repairContents(
    id: string,
    t: NestedTranslationClient<'CarCategoryName'>
): IMenu[] {
    const route = actionsRoute(id)

    return generateMenu(route.new, t, repairData)
}
