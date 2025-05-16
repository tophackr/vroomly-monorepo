import { Injectable } from '@nestjs/common'
import type { WheelInteraction } from '@vroomly/prisma'
import { CarService } from '@/car/car.service'
import { allowedFieldsDto } from '@/common/allowFieldsDto'
import { validateExists } from '@/common/validateEntity'
import { PrismaService } from '@/prisma/prisma.service'
import type { WheelInteractionDto } from './dto/wheelInteractionDto'

const ENTITY = 'WheelInteraction'

@Injectable()
export class WheelInteractionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly carService: CarService
    ) {}

    async create(
        userId: string,
        carId: string,
        interactionId: string,
        createWheelInteractionDto: WheelInteractionDto
    ): Promise<WheelInteraction> {
        await this.carService.findOne(userId, carId)

        const allowedFields = allowedFieldsDto(
            createWheelInteractionDto,
            ENTITY
        )

        return this.prismaService.wheelInteraction.create({
            data: { ...allowedFields, interactionId }
        })
    }

    private async findOne(id: string): Promise<WheelInteraction> {
        const item = await this.prismaService.wheelInteraction.findFirst({
            where: { interactionId: id }
        })

        return validateExists(item, ENTITY, id)
    }

    async update(
        userId: string,
        carId: string,
        interactionId: string,
        updateWheelInteractionDto: WheelInteractionDto
    ): Promise<WheelInteraction> {
        await this.carService.findOne(userId, carId)
        await this.findOne(interactionId)

        return this.prismaService.wheelInteraction.update({
            where: { interactionId },
            data: allowedFieldsDto(updateWheelInteractionDto, ENTITY)
        })
    }
}
