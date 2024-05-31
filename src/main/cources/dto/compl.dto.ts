import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
  export class CompleteCourseDto {
    @IsString()
    @ApiProperty({
      example: "Course id",
      description: "Course id",
    })
    @IsNotEmpty()
    @MaxLength(1000)
    course_id: string;
  }
