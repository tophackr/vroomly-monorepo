import { InteractionCategory } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const financeData: KeyMenu<InteractionCategory>[] = [
    {
        name: InteractionCategory.insurance,
        icon: 'Ambulance',
        bgColor: 'OrangeRed'
    },
    {
        name: InteractionCategory.tax,
        icon: 'Calculator',
        bgColor: 'MediumPurple'
    },
    {
        name: InteractionCategory.state_inspection,
        icon: 'LoaderPinwheel',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionCategory.fine,
        icon: 'CircleDollarSign',
        bgColor: 'Orange'
    },
    {
        name: InteractionCategory.car_purchase,
        icon: 'Container',
        bgColor: 'LimeGreen'
    },
    {
        name: InteractionCategory.loan_repayment,
        icon: 'Captions',
        bgColor: 'DeepPink'
    },
    {
        name: InteractionCategory.leasing,
        icon: 'NotepadText',
        bgColor: 'SlateGray'
    }
]

export function financeContents(
    id: string,
    t: NestedTranslationClient<'CarCategoryName'>
): IMenu[] {
    const route = actionsRoute(id)

    return generateMenu(route.new, t, financeData)
}
