import { Injectable } from '@nestjs/common'
import type { User } from '@vroomly/prisma'
import { allowedFieldsDto } from '@/common/allowFieldsDto'
import { validateExists } from '@/common/validateEntity'
import { PrismaService } from '@/prisma/prisma.service'
import type { UserDto } from './dto/userDto'

const ENTITY = 'User'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    create(id: string, createDto: UserDto): Promise<User> {
        return this.prismaService.user.create({
            data: { id, ...createDto }
        })
    }

    async update(id: string, updateDto: UserDto): Promise<User> {
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

        return validateExists(item, ENTITY, id)
    }
}
