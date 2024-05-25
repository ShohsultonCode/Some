import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString() 
  @ApiProperty({
    example:"Programming"
  })  
  @MinLength(3)
  @MaxLength(50)
  category_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:"Programming is most important skills"
  })  
  @MinLength(4)
  @MaxLength(650)
  category_description: string;


  @ApiProperty({
    example:"Image or Icons of this category"
  })  
  @IsOptional()
  category_image: any;

  @IsOptional()   
  @ApiProperty({
    example:"true or fale, it is optional"
  })  
  category_isactive: boolean;
}
