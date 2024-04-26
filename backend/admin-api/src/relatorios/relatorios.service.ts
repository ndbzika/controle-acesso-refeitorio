import { Inject, Injectable } from '@nestjs/common';
import { CreateRelatorioDTO } from './dto/create-relatorio.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RelatoriosService {
  constructor(@Inject('RELATORIOS_PACKAGE') private client: ClientProxy) {}
  createRelatorio(data: CreateRelatorioDTO) {
    return this.client.send('create-relatorio', data);
  }
}
