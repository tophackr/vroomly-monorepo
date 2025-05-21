import { Body, Controller, Get, Patch, Post } from '@nestjs/common'
import type { User } from '@vroomly/prisma'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { UserDto } from './dto/userDto'
import { UserService } from './user.service'

@Controller('user/@me')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(
        @CurrentUser('id') userId: string,
        @Body() createDto: UserDto
    ): Promise<User> {
        return this.userService.create(userId, createDto)
    }

    @Get()
    findOne(@CurrentUser('id') userId: string): Promise<User> {
        return this.userService.findOne(userId)
    }

    @Patch()
    update(
        @CurrentUser('id') userId: string,
        @Body() updateDto: UserDto
    ): Promise<User> {
        return this.userService.update(userId, updateDto)
    }
}
