import { forwardRef, Module } from '@nestjs/common'
import { CarModule } from '@/car/car.module'
import { PrismaService } from '@/prisma/prisma.service'
import { InteractionController } from './interaction.controller'
import { InteractionService } from './interaction.service'

@Module({
    controllers: [InteractionController],
    providers: [InteractionService, PrismaService],
    imports: [forwardRef(() => CarModule)]
})
export class InteractionModule {}
