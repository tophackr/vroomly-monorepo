import { PartialType } from '@nestjs/mapped-types'
import { CreateRepairDto } from './createRepairDto'

export class UpdateRepairDto extends PartialType(CreateRepairDto) {}
