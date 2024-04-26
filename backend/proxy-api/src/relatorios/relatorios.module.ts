import { Module } from '@nestjs/common';
import { RelatoriosService } from './relatorios.service';
import { RelatoriosController } from './relatorios.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3000,
        },
      },
    ]),
  ],
  controllers: [RelatoriosController],
  providers: [RelatoriosService],
})
export class RelatoriosModule {}
