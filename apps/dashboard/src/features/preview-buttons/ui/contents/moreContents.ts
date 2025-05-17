import { InteractionType } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const moreData: KeyMenu<InteractionType>[] = [
    {
        name: InteractionType.car_purchases,
        icon: 'Gift',
        bgColor: 'LimeGreen'
    },
    {
        name: InteractionType.tuning,
        icon: 'CircuitBoard',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionType.driver_salary,
        icon: 'Coins',
        bgColor: 'Orange'
    }
]

export function moreContents(
    id: string,
    t: NestedTranslationClient<'CarCategoryName'>
): IMenu[] {
    const route = actionsRoute(id)

    return generateMenu(route.new, t, moreData)
}
