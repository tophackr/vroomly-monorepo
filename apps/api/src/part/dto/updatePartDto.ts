import { PartialType } from '@nestjs/mapped-types'
import { CreatePartDto } from './createPartDto'

export class UpdatePartDto extends PartialType(CreatePartDto) {}
