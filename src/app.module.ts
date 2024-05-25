import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [SharedModule, DatabaseModule, AdminModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
