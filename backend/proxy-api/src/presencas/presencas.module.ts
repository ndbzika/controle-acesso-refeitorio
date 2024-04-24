import { Module } from '@nestjs/common';
import { PresencasService } from './presencas.service';
import { PresencasController } from './presencas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRESENCA_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3003,
        },
      },
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3000,
        },
      },
    ]),
  ],
  controllers: [PresencasController],
  providers: [PresencasService],
})
export class PresencasModule {}
