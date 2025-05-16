import { forwardRef, Module } from '@nestjs/common'
import { CarModule } from '@/car/car.module'
import { PrismaService } from '@/prisma/prisma.service'
import { FuelInteractionController } from './fuelInteraction.controller'
import { FuelInteractionService } from './fuelInteraction.service'

@Module({
    controllers: [FuelInteractionController],
    providers: [FuelInteractionService, PrismaService],
    imports: [forwardRef(() => CarModule)]
})
export class FuelInteractionModule {}
