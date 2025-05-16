import { forwardRef, Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { RepairModule } from '@/repair/repair.module'
import { RepairInteractionController } from './repairInteraction.controller'
import { RepairInteractionService } from './repairInteraction.service'

@Module({
    controllers: [RepairInteractionController],
    providers: [RepairInteractionService, PrismaService],
    imports: [forwardRef(() => RepairModule)]
})
export class RepairInteractionModule {}
