import { Body, Controller, Param, Put } from '@nestjs/common'
import type { RepairOnInteraction } from '@vroomly/prisma'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { CreateOrUpdateRepairInteractionDto } from './dto/createOrUpdateRepairInteractionDto'
import { RepairInteractionService } from './repairInteraction.service'

@Controller('car/:carId/repair-interaction/:id')
export class RepairInteractionController {
    constructor(
        private readonly repairInteractionService: RepairInteractionService
    ) {}

    @Put()
    createOrUpdate(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body()
        createOrUpdateRepairInteractionDto: CreateOrUpdateRepairInteractionDto
    ): Promise<RepairOnInteraction[]> {
        return this.repairInteractionService.createOrUpdate(
            userId,
            carId,
            id,
            createOrUpdateRepairInteractionDto
        )
    }
}
