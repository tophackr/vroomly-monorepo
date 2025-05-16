import { BadRequestException, Injectable } from '@nestjs/common'
import type { RepairOnInteraction } from '@vroomly/prisma'
import { PrismaService } from '@/prisma/prisma.service'
import { RepairService } from '@/repair/repair.service'
import type { CreateOrUpdateRepairInteractionDto } from './dto/createOrUpdateRepairInteractionDto'

@Injectable()
export class RepairInteractionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly repairService: RepairService
    ) {}

    async createOrUpdate(
        userId: string,
        carId: string,
        id: string,
        createOrUpdateRepairInteractionDto: CreateOrUpdateRepairInteractionDto
    ): Promise<RepairOnInteraction[]> {
        const repairs = await this.findAll(id)
        const repairIds = repairs.map(repair => repair.repairId)

        const allRepairs = await this.repairService.findAll(userId, carId)
        const allRepairIds = new Set(allRepairs.map(repair => repair.id))

        const ids = createOrUpdateRepairInteractionDto?.ids ?? repairIds
        const invalidIds = ids.filter(id => !allRepairIds.has(id))

        if (invalidIds.length > 0) {
            throw new BadRequestException(
                `The following repair IDs do not exist: '${invalidIds.join(
                    "', '"
                )}'`
            )
        }

        const removeIds = repairIds.filter(repairId => !ids.includes(repairId))
        const addIds = ids.filter(repairId => !repairIds.includes(repairId))

        await this.remove(id, removeIds)
        await this.create(id, addIds)

        return this.findAll(id)
    }

    private async create(id: string, ids: string[]): Promise<void> {
        if (ids.length > 0) {
            const repairOnInteractionsData = ids.map(repairId => ({
                interactionId: id,
                repairId
            }))

            await this.prismaService.repairOnInteraction.createMany({
                data: repairOnInteractionsData
            })
        }
    }

    private findAll(id: string): Promise<RepairOnInteraction[]> {
        return this.prismaService.repairOnInteraction.findMany({
            where: { interactionId: id }
        })
    }

    private async remove(id: string, ids: string[]): Promise<void> {
        if (ids.length > 0) {
            await this.prismaService.repairOnInteraction.deleteMany({
                where: { interactionId: id, repairId: { in: ids } }
            })
        }
    }
}
