import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import type { FuelInteraction } from '@vroomly/prisma'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { CreateFuelInteractionDto } from './dto/createFuelInteractionDto'
import { UpdateFuelInteractionDto } from './dto/updateFuelInteractionDto'
import { FuelInteractionService } from './fuelInteraction.service'

@Controller('car/:carId/fuel-interaction/:id')
export class FuelInteractionController {
    constructor(
        private readonly fuelInteractionService: FuelInteractionService
    ) {}

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body() createFuelInteractionDto: CreateFuelInteractionDto
    ): Promise<FuelInteraction> {
        return this.fuelInteractionService.create(
            userId,
            carId,
            id,
            createFuelInteractionDto
        )
    }

    @Patch()
    update(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body() updateInteractionDto: UpdateFuelInteractionDto
    ): Promise<FuelInteraction> {
        return this.fuelInteractionService.update(
            userId,
            carId,
            id,
            updateInteractionDto
        )
    }
}
