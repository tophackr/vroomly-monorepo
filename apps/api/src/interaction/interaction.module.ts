import { forwardRef, Module } from '@nestjs/common'
import { CarModule } from '@/car/car.module'
import { PartModule } from '@/part/part.module'
import { PrismaService } from '@/prisma/prisma.service'
import { RepairModule } from '@/repair/repair.module'
import { FuelInteractionService } from './fuelInteraction.service'
import { InteractionController } from './interaction.controller'
import { InteractionService } from './interaction.service'
import { PartInteractionService } from './partInteraction.service'
import { RepairInteractionService } from './repairInteraction.service'
import { WheelInteractionService } from './wheelInteraction.service'

@Module({
    controllers: [InteractionController],
    providers: [
        InteractionService,
        FuelInteractionService,
        PartInteractionService,
        RepairInteractionService,
        WheelInteractionService,
        PrismaService
    ],
    imports: [
        forwardRef(() => CarModule),
        forwardRef(() => RepairModule),
        forwardRef(() => PartModule)
    ]
})
export class InteractionModule {}
