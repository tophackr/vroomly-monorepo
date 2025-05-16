import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import type { Part } from '@vroomly/prisma'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { CreatePartDto } from './dto/createPartDto'
import { UpdatePartDto } from './dto/updatePartDto'
import { PartService } from './part.service'

@Controller('car/:carId/part')
export class PartController {
    constructor(private readonly partService: PartService) {}

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Body() createPartDto: CreatePartDto
    ): Promise<Part> {
        return this.partService.create(userId, carId, createPartDto)
    }

    @Get()
    findAll(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string
    ): Promise<Part[]> {
        return this.partService.findAll(userId, carId)
    }

    @Get(':id')
    findOne(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string
    ): Promise<Part> {
        return this.partService.findOne(userId, carId, id)
    }

    @Patch(':id')
    update(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body() updatePartDto: UpdatePartDto
    ): Promise<Part> {
        return this.partService.update(userId, carId, id, updatePartDto)
    }

    @Delete(':id')
    remove(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string
    ): Promise<Part> {
        return this.partService.remove(userId, carId, id)
    }
}
