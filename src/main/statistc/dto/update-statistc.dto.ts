import { PartialType } from '@nestjs/mapped-types';
import { CreateStatistcDto } from './create-statistc.dto';

export class UpdateStatistcDto extends PartialType(CreateStatistcDto) {}
