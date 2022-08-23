import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkingPlaceDto } from './create-working-place.dto';

export class UpdateWorkingPlaceDto extends PartialType(CreateWorkingPlaceDto) {}
