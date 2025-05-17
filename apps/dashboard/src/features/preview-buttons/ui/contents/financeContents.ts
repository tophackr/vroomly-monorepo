import { InteractionType } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import type { NestedTranslationClient } from '@/shared/i18n'
import type { IMenu, KeyMenu } from '@/shared/lib/link-menu'
import { generateMenu } from '@/shared/lib/link-menu'

const financeData: KeyMenu<InteractionType>[] = [
    {
        name: InteractionType.insurance,
        icon: 'Ambulance',
        bgColor: 'OrangeRed'
    },
    {
        name: InteractionType.tax,
        icon: 'Calculator',
        bgColor: 'MediumPurple'
    },
    {
        name: InteractionType.state_inspection,
        icon: 'LoaderPinwheel',
        bgColor: 'DodgerBlue'
    },
    {
        name: InteractionType.fine,
        icon: 'CircleDollarSign',
        bgColor: 'Orange'
    },
    {
        name: InteractionType.car_purchase,
        icon: 'Container',
        bgColor: 'LimeGreen'
    },
    {
        name: InteractionType.loan_repayment,
        icon: 'Captions',
        bgColor: 'DeepPink'
    },
    {
        name: InteractionType.leasing,
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
