import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class updateWalletDto {
  @IsNumber()
  @ApiProperty({
    example:"Wallet amount"
  })  
  @IsOptional()
  wallet_amount: number;

  @ApiProperty({
    example:"Wallet is active or not"
  })  
  @IsOptional()
  wallet_isactive: any;
}
