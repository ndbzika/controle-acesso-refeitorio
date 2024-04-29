import { Controller, UseGuards } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRelatorioDTO } from './dto/create-relatorio.dto';
import { Role } from '@prisma/client';
import RolesGuard from 'src/admins/roles.guard';

@Controller()
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @UseGuards(RolesGuard(Role.CAEST))
  @MessagePattern('create-relatorio')
  createRelatorio(data: CreateRelatorioDTO) {
    return this.relatoriosService.createRelatorio(data);
  }
}
