import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [PrismaModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
