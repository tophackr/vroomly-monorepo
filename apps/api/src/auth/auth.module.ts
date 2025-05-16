import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { TelegramStrategy } from './strategy/telegram.strategy'

@Module({
    imports: [ConfigModule, PassportModule],
    providers: [TelegramStrategy]
})
export class AuthModule {}
