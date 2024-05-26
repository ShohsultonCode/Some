  // dto/create-course.dto.ts
  import { ApiProperty } from '@nestjs/swagger';
  import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
  import { Type } from 'class-transformer';
  import { CreateCourseSectionDto } from 'src/main/category/dto/course.section.dto';
  export class CreateCourseDto {
    @IsString()
    @ApiProperty({
      example: "Advanced JavaScript",
      description: "Name of the course",
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    course_name: string;

    @IsString()
    @ApiProperty({
      example: "This course covers advanced concepts in JavaScript.",
      description: "Description of the course",
    })
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(1000)
    course_description: string;

    @IsString()
    @ApiProperty({
      example: "Id of category",
      description: "Category of the course",
    })
    @IsNotEmpty()
    course_category: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({
      example: ["list of users"],
      description: "List of people count descriptions",
    })
    @IsNotEmpty()
    course_people_count: string[];


    @IsString()
    @ApiProperty({
      example: "199.99",
      description: "Price of the course",
    })
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(10)
    course_price: string;

    @IsArray()
    @ApiProperty({
      example: ["Understand closures", "Master async programming"],
      description: "List of learning outcomes",
    })
    @IsNotEmpty()
    course_learns: string[];

    @IsString()
    @ApiProperty({
      example: "10 hours",
      description: "Duration of the course",
    })
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    course_duration: string;

    @IsString()
    @ApiProperty({
      example: "http://example.com/course-video.mp4",
      description: "URL of the course video",
    })
    @IsNotEmpty()
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
