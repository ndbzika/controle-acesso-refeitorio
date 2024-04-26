import { Inject, Injectable } from '@nestjs/common';
import { CreateRelatorioDTO } from './dto/create-relatorio.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class RelatoriosService {
  constructor(@Inject('ADMIN_SERVICE') private readonly client: ClientProxy) {}
  createRelatorio(data: CreateRelatorioDTO, req: Request) {
    return this.client.send('create-relatorio', {
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      req: req.admin,
    });
  }
}
