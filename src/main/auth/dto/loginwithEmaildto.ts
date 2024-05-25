import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

//LoginWithGoogleDto
export class loginWithEmailDto {
  
  @IsEmail() // Ensures the field contains a valid email address
  @ApiProperty({
    example:"Jo@gmail.com"
  })  
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255) // This is a common maximum length for email fields
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
