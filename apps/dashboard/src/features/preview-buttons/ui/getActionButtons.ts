import { InteractionType } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import { financeContents } from './contents/financeContents'
import { moreContents } from './contents/moreContents'
import { parkingContents } from './contents/parkingContents'
import { repairContents } from './contents/repairContents'
import type { ActionModalProps } from './props'

export function getActionButtons(carId: string): ActionModalProps[] {
    const route = actionsRoute(carId)

    const buttons: ActionModalProps[] = [
        { name: 'parking', icon: 'SquareParking', content: parkingContents },
        {
            name: 'wash',
            icon: 'CloudDrizzle',
            link: route.new(InteractionType.wash)
        },
        {
            name: 'fuel',
            icon: 'Fuel',
            link: route.new(InteractionType.fuel)
        },
        { name: 'repair', icon: 'Wrench', content: repairContents },
        { name: 'finance', icon: 'Landmark', content: financeContents },
        { name: 'more', icon: 'Ellipsis', content: moreContents }
    ]

    return buttons
}
