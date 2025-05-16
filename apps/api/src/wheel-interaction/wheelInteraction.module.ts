import { forwardRef, Module } from '@nestjs/common'
import { CarModule } from '@/car/car.module'
import { PrismaService } from '@/prisma/prisma.service'
import { WheelInteractionController } from './wheelInteraction.controller'
import { WheelInteractionService } from './wheelInteraction.service'

@Module({
    controllers: [WheelInteractionController],
    providers: [WheelInteractionService, PrismaService],
    imports: [forwardRef(() => CarModule)]
})
export class WheelInteractionModule {}
