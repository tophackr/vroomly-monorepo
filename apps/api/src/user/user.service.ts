import { Injectable } from '@nestjs/common'
import type { User } from '@vroomly/prisma'
import { allowedFieldsDto } from '@/common/allowFieldsDto'
import { PrismaService } from '@/prisma/prisma.service'
import type { UpdateUserDto } from './dto/updateUserDto'

const ENTITY = 'User'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    private create(id: string): Promise<User> {
        return this.prismaService.user.create({
            data: { id }
        })
    }

    async update(id: string, updateDto: UpdateUserDto): Promise<User> {
        await this.findOne(id)

        const allowedFields = allowedFieldsDto(updateDto, ENTITY)

        return this.prismaService.user.update({
            where: { id },
            data: allowedFields
        })
    }

    async findOne(id: string): Promise<User> {
        const item = await this.prismaService.user.findUnique({
            where: { id }
        })

        if (!item) {
            return this.create(id)
        }

        return item
    }
}
