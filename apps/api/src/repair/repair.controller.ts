import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import type { Repair } from '@vroomly/prisma'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { CreateRepairDto } from './dto/createRepairDto'
import { UpdateManyRepairDto } from './dto/updateManyRepairDto'
import { UpdateRepairDto } from './dto/updateRepairDto'
import { RepairService } from './repair.service'

@Controller('car/:carId/repair')
export class RepairController {
    constructor(private readonly repairService: RepairService) {}

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Body() createRepairDto: CreateRepairDto
    ): Promise<Repair> {
        return this.repairService.create(userId, carId, createRepairDto)
    }

    @Get()
    findAll(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string
    ): Promise<Repair[]> {
        return this.repairService.findAll(userId, carId)
    }

    @Get(':id')
    findOne(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string
    ): Promise<Repair> {
        return this.repairService.findOne(userId, carId, id)
    }

    @Patch(':id')
    update(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string,
        @Body() updateRepairDto: UpdateRepairDto
    ): Promise<Repair> {
        return this.repairService.update(userId, carId, id, updateRepairDto)
    }

    @Patch()
    updateMany(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Body() updateManyRepairDto: UpdateManyRepairDto
    ): Promise<Repair[]> {
        return this.repairService.updateMany(userId, carId, updateManyRepairDto)
    }

    @Delete(':id')
    remove(
        @CurrentUser('id') userId: string,
        @Param('carId') carId: string,
        @Param('id') id: string
    ): Promise<Repair> {
        return this.repairService.remove(userId, carId, id)
    }
}
