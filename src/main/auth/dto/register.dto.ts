import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

//LoginWithGoogleDto
export class registerDto {
  @ApiProperty({
    example:"John Doe"
  })  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  user_firstname: string;

  @ApiProperty({
    example:"John Doe"
  })  
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(25)
  user_lastname: string;

  @IsEmail() // Ensures the field contains a valid email address
  @ApiProperty({
    example:"Jo@gmail.com"
  })  
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255) 
  user_email: string;

  @IsString()
  @ApiProperty({
    example:"123326125"
  })  
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  user_password: string;
}
