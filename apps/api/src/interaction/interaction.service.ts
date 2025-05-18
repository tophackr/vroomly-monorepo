import { BadRequestException, Injectable } from '@nestjs/common'
import type { Interaction } from '@vroomly/prisma'
import { CarService } from '@/car/car.service'
import { allowedFieldsDto } from '@/common/allowFieldsDto'
import {
    isFuelType,
    isPartType,
    isRepairType,
    isWheelType
} from '@/common/isType'
import { validateExists } from '@/common/validateEntity'
import { PrismaService } from '@/prisma/prisma.service'
import type { CreateFuelInteractionDto } from './dto/createFuelInteractionDto'
import type { CreateInteractionDto } from './dto/createInteractionDto'
import type { UpdateInteractionDto } from './dto/updateInteractionDto'
import { FuelInteractionService } from './fuelInteraction.service'
import { PartInteractionService } from './partInteraction.service'
import { RepairInteractionService } from './repairInteraction.service'
import { WheelInteractionService } from './wheelInteraction.service'

const ENTITY = 'Interaction'

@Injectable()
export class InteractionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly carService: CarService,
        private readonly fuelInteractionService: FuelInteractionService,
        private readonly repairInteractionService: RepairInteractionService,
        private readonly partInteractionService: PartInteractionService,
        private readonly wheelInteractionService: WheelInteractionService
    ) {}

    private async createItemData(
        userId: string,
        carId: string,
        createInteractionDto: CreateInteractionDto,
        item: Interaction
    ): Promise<void> {
        if (createInteractionDto.fuelData && isFuelType(item.type)) {
            await this.fuelInteractionService.create(
                item.id,
                createInteractionDto.fuelData as CreateFuelInteractionDto
            )
        } else if (createInteractionDto.repairData && isRepairType(item.type)) {
            await this.repairInteractionService.createOrUpdate(
                userId,
                carId,
                item.id,
                createInteractionDto.repairData
            )
        } else if (createInteractionDto.partData && isPartType(item.type)) {
            await this.partInteractionService.createOrUpdate(
                userId,
                carId,
                item.id,
                createInteractionDto.partData
            )
        } else if (createInteractionDto.wheelData && isWheelType(item.type)) {
            await this.wheelInteractionService.create(
                item.id,
                createInteractionDto.wheelData
            )
        }
    }

    private async updateItemData(
        userId: string,
        carId: string,
        updateInteractionDto: UpdateInteractionDto,
        item: Interaction
    ): Promise<void> {
        if (updateInteractionDto.fuelData && isFuelType(item.type)) {
            await this.fuelInteractionService.update(
                item.id,
                updateInteractionDto.fuelData
            )
        } else if (updateInteractionDto.repairData && isRepairType(item.type)) {
            await this.repairInteractionService.createOrUpdate(
                userId,
                carId,
                item.id,
                updateInteractionDto.repairData
            )
        } else if (updateInteractionDto.partData && isPartType(item.type)) {
            await this.partInteractionService.createOrUpdate(
                userId,
                carId,
                item.id,
                updateInteractionDto.partData
            )
        } else if (updateInteractionDto.wheelData && isWheelType(item.type)) {
            await this.wheelInteractionService.update(
                item.id,
                updateInteractionDto.wheelData
            )
        }
    }

    async create(
        userId: string,
        carId: string,
        createInteractionDto: CreateInteractionDto
    ): Promise<Interaction> {
        await this.carService.findOne(userId, carId)

        const allowedFields = allowedFieldsDto(createInteractionDto, ENTITY)

        const item = await this.prismaService.interaction.create({
            data: { ...allowedFields, userId, carId }
        })

        await this.createItemData(userId, carId, createInteractionDto, item)

        return item
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

        const updatedItem = await this.prismaService.interaction.update({
            where: { userId, carId, id },
            data: allowedFieldsDto(updateInteractionDto, ENTITY)
        })

        await this.updateItemData(
            userId,
            carId,
            updateInteractionDto,
            updatedItem
        )

        return updatedItem
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
