import { Module } from '@nestjs/common';
import { CourcesService } from './cources.service';
import { CourcesController } from './cources.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ImageService } from '../image/image.service';
import { UtilsService } from 'src/admin/utilies.service';
import { WalletsService } from '../wallets/wallets.service';

@Module({
  imports:[
    MongooseModule.forFeature(Schemas),
    JwtModule.registerAsync({
      imports: [ConfigModule],  
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION'), 
        },
      }),
      inject: [ConfigService],  
    }),
   ],
  controllers: [CourcesController],
  providers: [CourcesService, ImageService, UtilsService, WalletsService],
})
export class CourcesModule {}
