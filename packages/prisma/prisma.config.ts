import 'dotenv/config'
import path from 'node:path'
import type { PrismaConfig } from 'prisma'

// eslint-disable-next-line import/no-default-export
export default {
    earlyAccess: true,
    schema: path.join('prisma')
} satisfies PrismaConfig
