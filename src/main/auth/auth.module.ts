import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ImageService } from '../image/image.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Users', schema: UserSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: `${configService.get('JWT_EXPIRATION')}`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard, JwtAuthGuard, ImageService],
})
export class AuthModule {}
