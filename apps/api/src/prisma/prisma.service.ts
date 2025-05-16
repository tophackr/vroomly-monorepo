import type { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@vroomly/prisma'
import { useSupabaseRowLevelSecurity } from './useSupabaseRowLevelSecurity'

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    async onModuleInit() {
        this.$extends(withAccelerate())
        this.$extends(useSupabaseRowLevelSecurity())
        await this.$connect()
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
