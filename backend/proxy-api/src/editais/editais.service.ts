import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';

@Injectable()
export class EditaisService {
  constructor(
    @Inject('ADMIN_SERVICE') private readonly adminClient: ClientProxy,
  ) {}
  uploadEdital(file: Express.Multer.File, req: Request) {
    return this.adminClient.emit('uploadEdital', {
      edital: file,
      req: req.admin,
    });
  }
}
