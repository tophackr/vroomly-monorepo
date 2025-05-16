import { IsArray, IsString } from 'class-validator'

export class CreateOrUpdateRepairInteractionDto {
    @IsArray()
    @IsString({ each: true })
    readonly ids!: string[]
}
