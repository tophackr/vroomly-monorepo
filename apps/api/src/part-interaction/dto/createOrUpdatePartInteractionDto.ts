import { IsArray, IsString } from 'class-validator'

export class CreateOrUpdatePartInteractionDto {
    @IsArray()
    @IsString({ each: true })
    readonly ids!: string[]
}
