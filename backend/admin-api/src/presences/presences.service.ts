import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PresencesService {
  constructor(
    @Inject('PRESENCE_SERVICE') private readonly client: ClientProxy,
  ) {}
  confirmPresence(alunoEmail: string) {
    this.client.emit('confirmPresence', { alunoEmail });
    return { message: 'Presença confirmada' };
  }
}
