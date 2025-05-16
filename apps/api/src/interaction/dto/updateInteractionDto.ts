import { PartialType } from '@nestjs/mapped-types'
import { CreateInteractionDto } from './createInteractionDto'

export class UpdateInteractionDto extends PartialType(CreateInteractionDto) {}
