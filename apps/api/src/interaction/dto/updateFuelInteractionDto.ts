import { PartialType } from '@nestjs/mapped-types'
import { CreateFuelInteractionDto } from './createFuelInteractionDto'

export class UpdateFuelInteractionDto extends PartialType(
    CreateFuelInteractionDto
) {}
