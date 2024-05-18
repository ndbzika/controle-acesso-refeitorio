import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { Request } from 'express';
import { AdminsGuard } from 'src/auth/auth.guard';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @UseGuards(AdminsGuard)
  @Get()
  getRelatorio(
    @Query('dataInicio') dataInicio: string, // Change the type to string
    @Query('dataFim') dataFim: string, // Change the type to string
    @Req() req: Request,
  ) {
    return this.relatoriosService.createRelatorio({ dataInicio, dataFim }, req);
  }
}
