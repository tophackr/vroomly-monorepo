import { Language } from '@vroomly/prisma'
import { Transform } from 'class-transformer'
import { IsEnum, IsString } from 'class-validator'

export class UpdateUserDto {
    @IsEnum(Language)
    @Transform(({ value }) => ('' + value).toLowerCase())
    readonly language!: Language

    @IsString()
    readonly timezone!: string
}
