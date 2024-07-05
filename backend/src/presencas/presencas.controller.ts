import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import RoleGuard from 'src/admins/roles.guard';
import { AdminsGuard } from 'src/auth/auth.guard';
import { PresencasService } from './presencas.service';

@Controller('presencas')
export class PresencasController {
  constructor(private readonly presencasService: PresencasService) {}

  @UseGuards(AdminsGuard)
  @UseGuards(RoleGuard(Role.COZINHA))
  @Get()
  findAllPresences() {
    return this.presencasService.findAllToday();
  }

  @UseGuards(AdminsGuard)
  @Get(':email')
  findAll(@Param('email') email: string) {
    return this.presencasService.findAll(email);
  }

  @UseGuards(AdminsGuard)
  @Patch(':email/confirm')
  @HttpCode(204)
  confirmPresence(@Param('email') email: string) {
    return this.presencasService.confirmPresence(email);
  }
}
