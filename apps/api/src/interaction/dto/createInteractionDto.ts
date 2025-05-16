import { InteractionCategory } from '@vroomly/prisma'
import { Transform } from 'class-transformer'
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator'

export class CreateInteractionDto {
    @IsEnum(InteractionCategory)
    @Transform(({ value }) => ('' + value).toLowerCase())
    readonly type!: InteractionCategory

    @IsDateString()
    readonly date!: Date

    @IsInt()
    @IsOptional()
    readonly mileage?: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    readonly amount?: number

    @IsInt()
    @IsOptional()
    readonly engineHours?: number

    @IsString()
    @IsOptional()
    readonly description?: string
}
