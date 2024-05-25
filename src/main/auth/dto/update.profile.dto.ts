import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

//LoginWithGoogleDto
export class updateProfileDto {
  @ApiProperty({
    example:"John Doe"
  })  
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @IsOptional()
  user_firstname: string;

  @ApiProperty({
    example:"John Doe"
  })  
  @IsString()
  @MinLength(3)
  @MaxLength(25)
  @IsOptional()
  user_lastname: string;

  @IsEmail() 
  @IsOptional()
  // Ensures the field contains a valid email address
  @ApiProperty({
    example:"Jo@gmail.com"
  })  
  @MinLength(3)
  @MaxLength(255) // This is a common maximum length for email fields
  user_email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:"123326125"
  })  
  @MinLength(4)
  @MaxLength(50)
  user_password: string;
}
