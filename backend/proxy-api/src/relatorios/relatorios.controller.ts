import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { CreateRelatorioDTO } from './dto/create-relatorio.dto';
import { Request } from 'express';
import { AdminsGuard } from 'src/auth/auth.guard';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @UseGuards(AdminsGuard)
  @Get()
  getRelatorio(@Body() data: CreateRelatorioDTO, @Req() req: Request) {
    return this.relatoriosService.createRelatorio(data, req);
  }
}
