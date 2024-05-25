import { Body, Controller, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { loginWithEmailDto } from './dto/loginwithEmaildto';
import { registerDto } from './dto/register.dto';
import { updateProfileDto } from './dto/update.profile.dto';
import { fileUploadInterceptor } from 'src/common/utils/file.catch';
import UploadedFileInter from 'src/common/entity/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() body: registerDto): Promise<Object> {
    return this.authService.registerWithEmail(body);
  }

  @Post('login')
  async login(@Body() body: loginWithEmailDto): Promise<Object> {
    return this.authService.loginWithEmail(body);
  }

  @Put('update')  
  @UseInterceptors(fileUploadInterceptor('user_image'))
  @UseGuards(JwtAuthGuard) 
  async update(@Body() body: updateProfileDto, @Req() req: any,  @UploadedFile() file: UploadedFileInter): Promise<Object> {
    return this.authService.updateProfile(body, req, file);
  }
}
