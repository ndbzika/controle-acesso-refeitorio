import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PresencasService } from './presencas.service';
import { AdminsGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('presencas')
export class PresencasController {
  constructor(private readonly presencasService: PresencasService) {}

  @UseGuards(AdminsGuard)
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
  confirmPresence(@Param('email') email: string, @Req() req: Request) {
    return this.presencasService.confirmPresence(email, req);
  }
}
