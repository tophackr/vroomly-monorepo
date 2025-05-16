import { BadRequestException, Injectable } from '@nestjs/common'
import type { Interaction } from '@vroomly/prisma'
import { CarService } from '@/car/car.service'
import { allowedFieldsDto } from '@/common/allowFieldsDto'
import { validateExists } from '@/common/validateEntity'
import { PrismaService } from '@/prisma/prisma.service'
import type { CreateInteractionDto } from './dto/createInteractionDto'
import type { UpdateInteractionDto } from './dto/updateInteractionDto'

const ENTITY = 'Interaction'

@Injectable()
export class InteractionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly carService: CarService
    ) {}

    async create(
        userId: string,
        carId: string,
        createInteractionDto: CreateInteractionDto
    ): Promise<Interaction> {
        await this.carService.findOne(userId, carId)

        const allowedFields = allowedFieldsDto(createInteractionDto, ENTITY)

        return this.prismaService.interaction.create({
            data: { ...allowedFields, userId, carId }
        })
    }

    async findAll(userId: string, carId: string): Promise<Interaction[]> {
        await this.carService.findOne(userId, carId)

        const items = await this.prismaService.interaction.findMany({
            where: { userId, carId },
            include: {
                fuelInteraction: true,
                repairInteractions: true,
                partInteractions: true,
                wheelInteraction: true
            },
            orderBy: {
                date: 'desc'
            }
        })

        return items
    }

    async findOne(
        userId: string,
        carId: string,
        id: string
    ): Promise<Interaction> {
        await this.carService.findOne(userId, carId)

        const item = await this.prismaService.interaction.findFirst({
            where: { userId, carId, id },
            include: {
                fuelInteraction: true,
                repairInteractions: true,
                partInteractions: true,
                wheelInteraction: true
            }
        })

        return validateExists(item, ENTITY, id)
    }

    async update(
        userId: string,
        carId: string,
        id: string,
        updateInteractionDto: UpdateInteractionDto
    ): Promise<Interaction> {
        await this.carService.findOne(userId, carId)
        const item = await this.findOne(userId, carId, id)

        if (
            'type' in updateInteractionDto &&
            updateInteractionDto.type !== item.type
        ) {
            throw new BadRequestException('You cannot change the item type.')
        }

        return this.prismaService.interaction.update({
            where: { userId, carId, id },
            data: allowedFieldsDto(updateInteractionDto, ENTITY)
        })
    }

    async remove(
        userId: string,
        carId: string,
        id: string
    ): Promise<Interaction> {
        await this.carService.findOne(userId, carId)
        await this.findOne(userId, carId, id)

        return this.prismaService.interaction.delete({
            where: { userId, carId, id }
        })
    }
}
