import { PartialType } from '@nestjs/mapped-types'
import { CreateCarDto } from './createCarDto'

export class UpdateCarDto extends PartialType(CreateCarDto) {}
