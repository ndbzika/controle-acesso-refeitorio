import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PresencasService } from './presencas.service';
import { AdminsGuard } from 'src/auth/auth.guard';

@Controller('presencas')
export class PresencasController {
  constructor(private readonly presencasService: PresencasService) {}

  @UseGuards(AdminsGuard)
  @Get(':email')
  findAll(@Param('email') email: string) {
    return this.presencasService.findAll(email);
  }
}
