// dto/create-course-section.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCourseSectionDto {
  @IsString()
  @ApiProperty({
    example: "Id of course",
    description: "Id of course",
  })
  @IsNotEmpty()
  cc_course_id:string;

  @IsString()
  @ApiProperty({
    example: "Introduction to JavaScript",
    description: "Title of the course section",
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  cc_title: string;

  @IsString()
  @ApiProperty({
    example: "This section covers the basics of JavaScript.",
    description: "Description of the course section",
  })
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  cc_description: string;

  @IsString()
  @ApiProperty({
    example: "http://example.com/intro-video.mp4",
    description: "URL of the section video",
  })
  @IsNotEmpty()
  @MaxLength(2048)
  cc_video: string;

  @IsDateString()
  @ApiProperty({
    example: "2024-01-01",
    description: "Date of the section creation",
  })
  @IsNotEmpty()
  cc_date: string;
}
