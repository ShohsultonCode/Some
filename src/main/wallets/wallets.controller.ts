import { Body, Controller, Delete, Post, Put, Req, UseGuards } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { updateWalletDto } from './dto/update.wallet.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}


  @Post()
  @UseGuards(JwtAuthGuard)
  async createWallet(@Req() req:any):Promise<Object>{
    return await this.walletsService.createWallet(req)
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteWallet(@Req() req:any):Promise<Object>{
    return await this.walletsService.deleteWallet(req)
  }


  @Put()
  @UseGuards(JwtAuthGuard)
  async updateWallet(@Req() req:any, @Body() body:updateWalletDto):Promise<Object>{
    return await this.walletsService.updateWallet(req, body)
  }
}
