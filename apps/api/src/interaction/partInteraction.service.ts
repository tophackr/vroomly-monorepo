import { BadRequestException, Injectable } from '@nestjs/common'
import type { PartOnInteraction } from '@vroomly/prisma'
import { PartService } from '@/part/part.service'
import { PrismaService } from '@/prisma/prisma.service'
import type { CreateOrUpdatePartInteractionDto } from './dto/createOrUpdatePartInteractionDto'

@Injectable()
export class PartInteractionService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly partService: PartService
    ) {}

    async createOrUpdate(
        userId: string,
        carId: string,
        id: string,
        createOrUpdatePartInteractionDto: CreateOrUpdatePartInteractionDto
    ): Promise<PartOnInteraction[]> {
        const parts = await this.findAll(id)
        const partIds = parts.map(part => part.partId)

        const allParts = await this.partService.findAll(userId, carId)
        const allPartIds = new Set(allParts.map(part => part.id))

        const ids = createOrUpdatePartInteractionDto?.ids ?? partIds
        const invalidIds = ids.filter(id => !allPartIds.has(id))

        if (invalidIds.length > 0) {
            throw new BadRequestException(
                `The following part IDs do not exist: '${invalidIds.join(
                    "', '"
                )}'`
            )
        }

        const removeIds = partIds.filter(partId => !ids.includes(partId))
        const addIds = ids.filter(partId => !partIds.includes(partId))

        await this.remove(id, removeIds)
        await this.create(id, addIds)

        return this.findAll(id)
    }

    private async create(id: string, ids: string[]): Promise<void> {
        if (ids.length > 0) {
            const partOnInteractionsData = ids.map(partId => ({
                interactionId: id,
                partId
            }))

            await this.prismaService.partOnInteraction.createMany({
                data: partOnInteractionsData
            })
        }
    }

    private findAll(id: string): Promise<PartOnInteraction[]> {
        return this.prismaService.partOnInteraction.findMany({
            where: { interactionId: id }
        })
    }

    private async remove(id: string, ids: string[]): Promise<void> {
        if (ids.length > 0) {
            await this.prismaService.partOnInteraction.deleteMany({
                where: { interactionId: id, partId: { in: ids } }
            })
        }
    }
}
