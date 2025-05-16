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
import type { CreateFuelInteractionDto } from './createFuelInteractionDto'
import type { CreateOrUpdatePartInteractionDto } from './createOrUpdatePartInteractionDto'
import type { CreateOrUpdateRepairInteractionDto } from './createOrUpdateRepairInteractionDto'
import type { UpdateFuelInteractionDto } from './updateFuelInteractionDto'
import type { WheelInteractionDto } from './wheelInteractionDto'

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

    readonly fuelData?: CreateFuelInteractionDto | UpdateFuelInteractionDto
    readonly partData?: CreateOrUpdatePartInteractionDto
    readonly repairData?: CreateOrUpdateRepairInteractionDto
    readonly wheelData?: WheelInteractionDto
}
