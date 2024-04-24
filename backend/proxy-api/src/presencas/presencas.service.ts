import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class PresencasService {
  constructor(
    @Inject('PRESENCA_SERVICE') private readonly presencaService: ClientProxy,
    @Inject('ADMIN_SERVICE') private readonly adminService: ClientProxy,
  ) {}
  findAll(email: string) {
    return this.presencaService.send('findAll', { alunoEmail: email });
  }

  confirmPresence(email: string, req: Request) {
    return this.adminService.send('confirmPresence', {
      alunoEmail: email,
      req: req.admin,
    });
  }
}
