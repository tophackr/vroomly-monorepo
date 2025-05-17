import { InteractionType } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const parkingData: KeyMenu<InteractionType>[] = [
    {
        name: InteractionType.parking,
        icon: 'SquareParking',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionType.toll_road,
        icon: 'TrafficCone',
        bgColor: 'YellowGreen'
    },
    {
        name: InteractionType.taxi,
        icon: 'CarTaxiFront',
        bgColor: 'Orange'
    },
    {
        name: InteractionType.sober_driver,
        icon: 'ContactRound',
        bgColor: 'MediumPurple'
    },
    {
        name: InteractionType.alarm_system,
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
