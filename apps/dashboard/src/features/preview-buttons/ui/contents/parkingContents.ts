import { InteractionCategory } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const parkingData: KeyMenu<InteractionCategory>[] = [
    {
        name: InteractionCategory.parking,
        icon: 'SquareParking',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionCategory.toll_road,
        icon: 'TrafficCone',
        bgColor: 'YellowGreen'
    },
    {
        name: InteractionCategory.taxi,
        icon: 'CarTaxiFront',
        bgColor: 'Orange'
    },
    {
        name: InteractionCategory.sober_driver,
        icon: 'ContactRound',
        bgColor: 'MediumPurple'
    },
    {
        name: InteractionCategory.alarm_system,
        icon: 'Satellite',
        bgColor: 'DeepPink'
    }
]

export function parkingContents(
    id: string,
    t: NestedTranslationClient<'CarCategoryName'>
): IMenu[] {
    const route = actionsRoute(id)

    return generateMenu(route.new, t, parkingData)
}
