import { InteractionType } from '@vroomly/prisma'
import { actionsRoute } from '@/entities/interaction'
import { FinanceContents } from './contents/FinanceContents'
import { MoreContents } from './contents/MoreContents'
import { ParkingContents } from './contents/ParkingContents'
import { RepairContents } from './contents/RepairContents'
import type { ActionModalProps } from './props'

export function getActionButtons(carId: string): ActionModalProps[] {
    const route = actionsRoute(carId)

    const buttons: ActionModalProps[] = [
        { name: 'parking', icon: 'SquareParking', Content: ParkingContents },
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
        { name: 'repair', icon: 'Wrench', Content: RepairContents },
        { name: 'finance', icon: 'Landmark', Content: FinanceContents },
        { name: 'more', icon: 'Ellipsis', Content: MoreContents }
    ]

    return buttons
}
