import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { UserSchema } from 'src/common';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Schemas } from 'src/config/constant';
import { WalletsService } from '../wallets/wallets.service';

@Module({
  imports: [
    MongooseModule.forFeature(Schemas),
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
  controllers: [UsersController],
  providers: [UsersService, JwtAuthGuard, WalletsService],
})
export class UsersModule { }

