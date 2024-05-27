import { IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSectionCompletionDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    example: '60d5ec49d8d55b001c8b4568',
    description: 'Id of the course',
  })
  usc_course_id: string;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({
    example: '60d5ec49d8d55b001c8b4569',
    description: 'Id of the section',
  })
  usc_section_id: string;

}
