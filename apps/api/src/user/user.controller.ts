import { Body, Controller, Get, Patch } from '@nestjs/common'
import type { User } from '@vroomly/prisma'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { UpdateUserDto } from './dto/updateUserDto'
import { UserService } from './user.service'

@Controller('user/@me')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findOne(@CurrentUser('id') userId: string): Promise<User> {
        return this.userService.findOne(userId)
    }

    @Patch()
    update(
        @CurrentUser('id') userId: string,
        @Body() updateDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.update(userId, updateDto)
    }
}
