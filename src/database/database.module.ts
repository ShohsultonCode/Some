import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/common';
@Module({
  imports: [
    ConfigModule.forRoot(), // If you want to use the config module
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // If you want to use the config module
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DATABASE_CONNECTION'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Import your Mongoose schema
  ],
})
export class DatabaseModule {}
