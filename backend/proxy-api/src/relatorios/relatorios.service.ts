import { Inject, Injectable } from '@nestjs/common';
import { CreateRelatorioDTO } from './dto/create-relatorio.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RelatoriosService {
  constructor(@Inject('ADMIN_SERVICE') private readonly client: ClientProxy) {}
  async createRelatorio(data: CreateRelatorioDTO, req: Request) {
    const observable = this.client.send('create-relatorio', {
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      req: req.admin,
    });
    return lastValueFrom(observable);
  }
}
