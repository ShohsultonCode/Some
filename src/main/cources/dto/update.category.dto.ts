// dto/create-course.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
export class UpdateCourseDto {
  @IsString()
  @ApiProperty({
    example: "Id of course",
    description: "Id of the course",
  })
  course_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Advanced JavaScript",
    description: "Name of the course",
  })
  @MinLength(3)
  @MaxLength(100)
  course_name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "This course covers advanced concepts in JavaScript.",
    description: "Description of the course",
  })
  @MinLength(10)
  @MaxLength(1000)
  course_description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "Programming",
    description: "Category of the course",
  })
  course_category: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "199.99",
    description: "Price of the course",
  })
  @MinLength(1)
  @MaxLength(10)
  course_price: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: ["Understand closures", "Master async programming"],
    description: "List of learning outcomes",
  })
  course_learns: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "10 hours",
    description: "Duration of the course",
  })
  @MinLength(1)
  @MaxLength(50)
  course_duration: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: "http://example.com/course-video.mp4",
    description: "URL of the course video",
  })
  @MaxLength(2048)
  course_video: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: "Indicates if the course is active",
  })
  course_isactive?: boolean;
}
