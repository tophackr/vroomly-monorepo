import { RimType, TireType, WheelType } from '@vroomly/prisma'
import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

export class WheelInteractionDto {
    @IsEnum(WheelType)
    @Transform(({ value }) => ('' + value).toLowerCase())
    readonly wheelType!: WheelType

    @IsEnum(TireType)
    @IsOptional()
    readonly tireType?: TireType

    @IsEnum(RimType)
    @IsOptional()
    readonly rimType?: RimType

    @IsString()
    @IsOptional()
    readonly brand?: string

    @IsString()
    @IsOptional()
    readonly model?: string

    @IsNumber({ maxDecimalPlaces: 1 })
    @IsOptional()
    readonly width?: number

    @IsInt()
    @IsOptional()
    readonly height?: number

    @IsInt()
    @IsOptional()
    readonly diameter?: number
}
