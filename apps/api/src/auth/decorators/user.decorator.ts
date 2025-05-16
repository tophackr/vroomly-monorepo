import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { User } from '@vroomly/prisma'
import type { Request } from 'express'

interface RequestWithUser extends Request {
    user: User
}

export const CurrentUser = createParamDecorator(
    (data: keyof User, ctx: ExecutionContext) => {
        const http = ctx.switchToHttp()
        const { user } = http.getRequest<RequestWithUser>()
        user['id'] = String(user['id'])

        return data ? user[data] : user
    }
)
