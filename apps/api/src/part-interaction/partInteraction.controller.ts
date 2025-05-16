import { Body, Controller, Param, Put } from '@nestjs/common'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { CreateOrUpdatePartInteractionDto } from './dto/createOrUpdatePartInteractionDto'
import { PartInteractionService } from './partInteraction.service'

@Controller('car/:carId/part-interaction/:id')
export class PartInteractionController {
    constructor(
        private readonly partInteractionService: PartInteractionService
    ) {}

    @Put()
    createOrUpdate(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body()
        createOrUpdatePartInteractionDto: CreateOrUpdatePartInteractionDto
    ) {
        return this.partInteractionService.createOrUpdate(
            userId,
            carId,
            id,
            createOrUpdatePartInteractionDto
        )
    }
}
