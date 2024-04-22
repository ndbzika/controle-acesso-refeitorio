import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PresencasService {
  constructor(
    @Inject('PRESENCA_SERVICE') private readonly presencaService: ClientProxy,
  ) {}
  findAll(email: string) {
    return this.presencaService.send('findAll', { alunoEmail: email });
  }
}
