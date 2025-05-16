import { forwardRef, Module } from '@nestjs/common'
import { PartModule } from '@/part/part.module'
import { PrismaService } from '@/prisma/prisma.service'
import { PartInteractionController } from './partInteraction.controller'
import { PartInteractionService } from './partInteraction.service'

@Module({
    controllers: [PartInteractionController],
    providers: [PartInteractionService, PrismaService],
    imports: [forwardRef(() => PartModule)]
})
export class PartInteractionModule {}
