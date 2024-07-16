import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import RolesGuard from 'src/admins/roles.guard';
import { AdminsGuard } from 'src/auth/auth.guard';
import { RelatoriosService } from './relatorios.service';
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @UseGuards(AdminsGuard)
  @UseGuards(RolesGuard(Role.CAEST))
  @Get()
  getRelatorio(
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    return this.relatoriosService.createRelatorio({ dataInicio, dataFim });
  }
}
