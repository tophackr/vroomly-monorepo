import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { WheelInteractionDto } from './dto/wheelInteractionDto'
import { WheelInteractionService } from './wheelInteraction.service'

@Controller('car/:carId/wheel-interaction/:id')
export class WheelInteractionController {
    constructor(
        private readonly wheelInteractionService: WheelInteractionService
    ) {}

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body() createWheelInteractionDto: WheelInteractionDto
    ) {
        return this.wheelInteractionService.create(
            userId,
            carId,
            id,
            createWheelInteractionDto
        )
    }

    @Patch()
    update(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body() updateInteractionDto: WheelInteractionDto
    ) {
        return this.wheelInteractionService.update(
            userId,
            carId,
            id,
            updateInteractionDto
        )
    }
}
