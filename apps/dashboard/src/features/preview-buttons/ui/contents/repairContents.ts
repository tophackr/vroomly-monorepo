import { InteractionCategory } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const repairData: KeyMenu<InteractionCategory>[] = [
    {
        name: InteractionCategory.maintenance,
        icon: 'Bike',
        bgColor: 'MediumPurple'
    },
    {
        name: InteractionCategory.tire_service,
        icon: 'Badge',
        bgColor: 'LimeGreen'
    },
    {
        name: InteractionCategory.repair,
        icon: 'Orbit',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionCategory.part,
        icon: 'PocketKnife',
        bgColor: 'SlateGray'
    },
    {
        name: InteractionCategory.purchase_wheels,
        icon: 'Aperture',
        bgColor: 'Orange'
    },
    {
        name: InteractionCategory.tow_truck,
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
