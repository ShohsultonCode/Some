import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsService } from 'src/admin/utilies.service';
import { ImageService } from '../image/image.service';

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
  controllers: [CategoryController],
  providers: [CategoryService, UtilsService, ImageService],
})
export class CategoryModule {}
