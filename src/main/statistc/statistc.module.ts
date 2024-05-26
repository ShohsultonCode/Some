import { Module } from '@nestjs/common';
import { StatistcService } from './statistc.service';
import { StatistcController } from './statistc.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schemas } from 'src/config/constant';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  controllers: [StatistcController],
  providers: [StatistcService],
})
export class StatistcModule {}
