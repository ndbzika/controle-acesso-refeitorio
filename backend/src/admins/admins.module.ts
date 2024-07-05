import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminsController } from './admins.controller';
import { AdminsGuard } from './admins.guard';
import { AdminsService } from './admins.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AdminsGuard],
})
export class AdminsModule {}
