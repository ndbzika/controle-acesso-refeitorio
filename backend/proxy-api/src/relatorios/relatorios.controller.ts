import { Body, Controller, Get, Req } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { CreateRelatorioDTO } from './dto/create-relatorio.dto';
import { Request } from 'express';

@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get()
  getRelatorio(@Body() data: CreateRelatorioDTO, @Req() req: Request) {
    return this.relatoriosService.createRelatorio(data, req);
  }
}
