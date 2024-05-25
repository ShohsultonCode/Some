import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsNotEmpty({ message: 'Category id is required' })
  @ApiProperty({
    example:"category id"
  })  
  @IsString()
  category_id:string


  @IsString()
  @ApiProperty({
    example:"Pizza"
  }) 
  @IsOptional()
  category_name: string;

  @IsString()
  @ApiProperty({
    example:"Description of category"
  }) 
  @IsOptional()
  category_description: string;

  @ApiProperty({
    example:"Your image"
  })  
  @IsOptional()
  category_image: string;

  @IsBoolean()
  @ApiProperty({
    example:"true or false It is optional"
  })  
  @IsOptional()
  category_isactive: boolean;
}
