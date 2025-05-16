import { FuelGrade } from '@vroomly/prisma'
import { Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator'

export class CreateFuelInteractionDto {
    @IsEnum(FuelGrade)
    @Transform(({ value }) => ('' + value).toLowerCase())
    readonly fuelGrade!: FuelGrade

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    readonly capacity?: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    readonly price?: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    readonly beforeRefueling?: number

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    readonly afterRefueling?: number

    @IsBoolean()
    @IsOptional()
    readonly capacityFull?: boolean
}
