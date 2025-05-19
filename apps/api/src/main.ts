import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import morgan from 'morgan'
import type { IncomingMessage, ServerResponse } from 'node:http'
import process from 'node:process'
import { AppModule } from './app.module'
import { TelegramGuard } from './auth/guards/telegram.guard'
import { initLogger } from './logger'

async function bootstrap() {
    const isDev = process.env.NODE_ENV === 'development'

    const { log } = initLogger({
        bgColor: '#1E3A8A',
        textColor: 'white',
        shouldLog: isDev
    })

    const app = await NestFactory.create(AppModule)

    morgan.token('time', () => new Date().toTimeString().split(' ')[0])

    app.setGlobalPrefix('api')
    app.useGlobalGuards(new TelegramGuard())
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.use(
        morgan(
            isDev
                ? '[:time] :method :url :status :res[content-length] - :response-time ms'
                : 'combined',
            {
                skip: (
                    _: IncomingMessage,
                    res: ServerResponse<IncomingMessage>
                ) => !isDev && res.statusCode < 400
            }
        )
    )
    app.enableCors({
        origin: process.env.DASHBOARD_URL,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'X-Telegram-Data'],
        credentials: true
    })

    await app.listen(process.env.PORT ?? 3001)
    log('sterted at port: ' + (await app.getUrl()))
}

// eslint-disable-next-line unicorn/prefer-top-level-await
void bootstrap()
