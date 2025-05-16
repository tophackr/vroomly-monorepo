import { InteractionCategory } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const moreData: KeyMenu<InteractionCategory>[] = [
    {
        name: InteractionCategory.car_purchases,
        icon: 'Gift',
        bgColor: 'LimeGreen'
    },
    {
        name: InteractionCategory.tuning,
        icon: 'CircuitBoard',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionCategory.driver_salary,
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
