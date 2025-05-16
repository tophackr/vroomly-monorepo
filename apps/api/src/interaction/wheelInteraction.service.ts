import { Injectable } from '@nestjs/common'
import type { WheelInteraction } from '@vroomly/prisma'
import { allowedFieldsDto } from '@/common/allowFieldsDto'
import { validateExists } from '@/common/validateEntity'
import { PrismaService } from '@/prisma/prisma.service'
import type { WheelInteractionDto } from './dto/wheelInteractionDto'

const ENTITY = 'WheelInteraction'

@Injectable()
export class WheelInteractionService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(
        interactionId: string,
        createWheelInteractionDto: WheelInteractionDto
    ): Promise<WheelInteraction> {
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
        interactionId: string,
        updateWheelInteractionDto: WheelInteractionDto
    ): Promise<WheelInteraction> {
        await this.findOne(interactionId)

        return this.prismaService.wheelInteraction.update({
            where: { interactionId },
            data: allowedFieldsDto(updateWheelInteractionDto, ENTITY)
        })
    }
}
