import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpStatus } from '@nestjs/common'
import { ThrottlerException } from '@nestjs/throttler'
import type { Request, Response } from 'express'

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
    catch(_: ThrottlerException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        ctx.getRequest()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()

        const retryAfterHeader = response.getHeader('Retry-After')
        const remainingTime = retryAfterHeader
            ? Number.parseInt(retryAfterHeader as string, 10)
            : 0

        response.status(HttpStatus.TOO_MANY_REQUESTS).json({
            message: 'Too many requests. Please try again later.',
            error: 'Too Many Requests',
            statusCode: HttpStatus.TOO_MANY_REQUESTS,
            path: request.url,
            remainingTime
        })
    }
}
