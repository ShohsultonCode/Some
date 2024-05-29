import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
  export class FilterCourseDto {
    @IsString()
    @ApiProperty({
      example: "Course name",
      description: "Course name",
    })
    @IsNotEmpty()
    @MaxLength(1000)
    course_name: string;
  }
