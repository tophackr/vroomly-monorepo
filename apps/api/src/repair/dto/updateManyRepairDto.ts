import { Type } from 'class-transformer'
import { IsArray, IsString, ValidateNested } from 'class-validator'
import { UpdateRepairDto } from './updateRepairDto'

class UpdateRepairWithIdDto extends UpdateRepairDto {
    @IsString()
    readonly id!: string
}

export class UpdateManyRepairDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateRepairWithIdDto)
    readonly repairs!: UpdateRepairWithIdDto[]
}
