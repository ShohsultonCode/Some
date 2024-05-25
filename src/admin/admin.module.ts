import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminGuard } from 'src/common/guards/checkrole.guard';
import { Schemas } from 'src/config/constant';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UtilsService } from './utilies.service';


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
 controllers: [AdminController],
 providers: [AdminService, UtilsService, AdminGuard], 
})
export class AdminModule {}
