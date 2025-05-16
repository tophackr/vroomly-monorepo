import { Injectable } from '@nestjs/common'
import type { FuelInteraction } from '@vroomly/prisma'
import { allowedFieldsDto } from '@/common/allowFieldsDto'
import { validateExists } from '@/common/validateEntity'
import { PrismaService } from '@/prisma/prisma.service'
import type { CreateFuelInteractionDto } from './dto/createFuelInteractionDto'
import type { UpdateFuelInteractionDto } from './dto/updateFuelInteractionDto'

const ENTITY = 'FuelInteraction'

@Injectable()
export class FuelInteractionService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(
        interactionId: string,
        createFuelInteractionDto: CreateFuelInteractionDto
    ): Promise<FuelInteraction> {
        const allowedFields = allowedFieldsDto(createFuelInteractionDto, ENTITY)

        return this.prismaService.fuelInteraction.create({
            data: { ...allowedFields, interactionId }
        })
    }

    private async findOne(id: string): Promise<FuelInteraction> {
        const item = await this.prismaService.fuelInteraction.findFirst({
            where: { interactionId: id }
        })

        return validateExists(item, ENTITY, id)
    }

    async update(
        interactionId: string,
        updateFuelInteractionDto: UpdateFuelInteractionDto = {}
    ): Promise<FuelInteraction> {
        await this.findOne(interactionId)

        return this.prismaService.fuelInteraction.update({
            where: { interactionId },
            data: allowedFieldsDto(updateFuelInteractionDto, ENTITY)
        })
    }
}
