import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import type { Car } from '@vroomly/prisma'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { CarService } from './car.service'
import { CreateCarDto } from './dto/createCarDto'
import { UpdateCarDto } from './dto/updateCarDto'

@Controller('car')
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Body() createCarDto: CreateCarDto
    ): Promise<Car> {
        return this.carService.create(userId, createCarDto)
    }

    @Get()
    findAll(@CurrentUser('id') userId: string): Promise<Car[]> {
        return this.carService.findAll(userId)
    }

    @Get(':id')
    findOne(
        @CurrentUser('id') userId: string,
        @Param('id') id: string
    ): Promise<Car> {
        return this.carService.findOne(userId, id)
    }

    @Patch(':id')
    update(
        @CurrentUser('id') userId: string,
        @Param('id') id: string,
        @Body() updateCarDto: UpdateCarDto
    ): Promise<Car> {
        return this.carService.update(userId, id, updateCarDto)
    }

    @Delete(':id')
    remove(
        @CurrentUser('id') userId: string,
        @Param('id') id: string
    ): Promise<Car> {
        return this.carService.remove(userId, id)
    }
}
