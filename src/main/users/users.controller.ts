import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { WalletCheckGuard } from 'src/common/guards/wallet.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  @UseGuards(JwtAuthGuard) 
  async profile(@Req() req: any): Promise<Object> {
    return this.usersService.getProfile(req);
  }
  @Get('/org')
  @UseGuards(JwtAuthGuard) 
  async org(@Req() req: any): Promise<any> {
    return this.usersService.createOrg();
  }

  @Post('/register/course/:id')
  @UseGuards(WalletCheckGuard) 
  @UseGuards(JwtAuthGuard) 
  async registerCourse(@Param("id") id:string,  @Req() req: any): Promise<Object> {
    return this.usersService.registerCourse(id, req);
  }
}
